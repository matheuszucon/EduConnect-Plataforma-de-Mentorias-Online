import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MentorshipCard } from './components/MentorshipCard';
import { StudyGroupCard } from './components/StudyGroupCard';
import { Modal } from './components/Modal';
import { CreateStudyGroupForm } from './components/CreateStudyGroupForm';
import { MentorshipDetails } from './components/MentorshipDetails';
import { StudyGroupDetails } from './components/StudyGroupDetails';
import { MENTORSHIPS, STUDY_GROUPS } from './data';
import type { Mentorship, StudyGroup, User, Material } from './types';
import { PlusIcon } from './components/icons/PlusIcon';
import { SignUpForm } from './components/SignUpForm';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';

type View = 'main' | 'groupDetails' | 'dashboard';

const App: React.FC = () => {
  const [mentorships, setMentorships] = useState<Mentorship[]>(MENTORSHIPS);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>(STUDY_GROUPS);
  const [currentView, setCurrentView] = useState<View>('main');
  
  const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [selectedMentorship, setSelectedMentorship] = useState<Mentorship | null>(null);
  const [selectedStudyGroup, setSelectedStudyGroup] = useState<StudyGroup | null>(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  
  // Sign-up state
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [signUpSuccess, setSignUpSuccess] = useState<string | null>(null);

  // Login state
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleCreateStudyGroup = useCallback((newGroupData: Omit<StudyGroup, 'id' | 'members' | 'membersList' | 'materials'>) => {
    const newGroup: StudyGroup = {
      id: studyGroups.length + 1,
      ...newGroupData,
      members: 1,
      membersList: loggedInUser ? [{ id: loggedInUser.id, name: loggedInUser.name, avatarUrl: `https://i.pravatar.cc/150?u=${loggedInUser.id}`}] : [],
      materials: [],
    };
    setStudyGroups(prevGroups => [newGroup, ...prevGroups]);
    setCreateGroupModalOpen(false);
  }, [studyGroups, loggedInUser]);

  const handleViewMentorshipDetails = useCallback((mentorship: Mentorship) => {
    setSelectedMentorship(mentorship);
  }, []);

  const handleViewGroupDetails = useCallback((group: StudyGroup) => {
    setSelectedStudyGroup(group);
    setCurrentView('groupDetails');
  }, []);
  
  const handleBackToMain = useCallback(() => {
    setSelectedStudyGroup(null);
    setCurrentView('main');
  }, []);

  const handleViewDashboard = useCallback(() => {
    setCurrentView('dashboard');
  }, []);
  
  const handleGoHome = useCallback(() => {
    setSelectedStudyGroup(null);
    setCurrentView('main');
  }, []);

  const handleShareMaterial = (groupId: number, newMaterialData: Omit<Material, 'id' | 'sharedBy' | 'sharedAt'>) => {
    const newMaterial: Material = {
        ...newMaterialData,
        id: Date.now(),
        sharedBy: loggedInUser?.name || 'Membro',
        sharedAt: new Date().toLocaleDateString('pt-BR'),
    };

    const updatedGroups = studyGroups.map(group => {
        if (group.id === groupId) {
            const updatedGroup = {
                ...group,
                materials: [newMaterial, ...group.materials]
            };
            // also update the selected study group to reflect the change immediately
            setSelectedStudyGroup(updatedGroup);
            return updatedGroup;
        }
        return group;
    });
    setStudyGroups(updatedGroups);
  };

  const handleSignUp = async (userData: { name: string; email: string; password: string }) => {
    setIsSigningUp(true);
    setSignUpError(null);
    setSignUpSuccess(null);

    const AIRTABLE_API_KEY = 'patATJbOyskTjmQtP.a0f41625e4407ab1a4700d0d9afd28b3e7875c84d8482a111d4e79f9cdc08235';
    const AIRTABLE_BASE_ID = 'appDCxeWek13OhdNF';
    const AIRTABLE_TABLE_NAME = 'Users';

    try {
      const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Name: userData.name,
                Email: userData.email,
                Password: userData.password,
              },
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Falha ao criar a conta. Por favor, tente novamente.');
      }
      
      setSignUpSuccess('Conta criada com sucesso! Agora você pode fazer o login.');

    } catch (error) {
      if (error instanceof Error) {
        setSignUpError(error.message);
      } else {
        setSignUpError('Ocorreu um erro inesperado.');
      }
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    setIsLoggingIn(true);
    setLoginError(null);

    const AIRTABLE_API_KEY = 'patATJbOyskTjmQtP.a0f41625e4407ab1a4700d0d9afd28b3e7875c84d8482a111d4e79f9cdc08235';
    const AIRTABLE_BASE_ID = 'appDCxeWek13OhdNF';
    const AIRTABLE_TABLE_NAME = 'Users';

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?filterByFormula=({Email} = "${email}")`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao comunicar com o servidor. Tente novamente.');
      }

      const data = await response.json();

      if (data.records.length === 0) {
        setLoginError('E-mail ou senha inválidos.');
        return;
      }

      const userRecord = data.records[0];
      const storedPassword = userRecord.fields.Password;

      if (password !== storedPassword) {
        setLoginError('E-mail ou senha inválidos.');
        return;
      }
      
      setLoggedInUser({
        id: userRecord.id,
        name: userRecord.fields.Name,
        email: userRecord.fields.Email,
        // Hardcoded for demonstration purposes
        mentorshipIds: [1, 3],
        studyGroupIds: [2],
      });
      closeLoginModal();

    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('Ocorreu um erro inesperado.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setCurrentView('main');
  };

  // Modal handlers
  const openLoginModal = () => {
    setLoginError(null);
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
    setTimeout(() => {
        setLoginError(null);
    }, 300);
  };
  
  const openSignUpModal = () => {
    setSignUpError(null);
    setSignUpSuccess(null);
    setSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
    setTimeout(() => {
        setSignUpError(null);
        setSignUpSuccess(null);
    }, 300);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return loggedInUser ? (
          <Dashboard 
            user={loggedInUser}
            userMentorships={mentorships.filter(m => loggedInUser.mentorshipIds?.includes(m.id))}
            userStudyGroups={studyGroups.filter(g => loggedInUser.studyGroupIds?.includes(g.id))}
            onBack={() => setCurrentView('main')}
            onViewMentorshipDetails={handleViewMentorshipDetails}
            onViewStudyGroupDetails={handleViewGroupDetails}
          />
        ) : null;
      case 'groupDetails':
        return selectedStudyGroup ? (
          <StudyGroupDetails 
            group={selectedStudyGroup} 
            onBack={handleBackToMain}
            onShareMaterial={handleShareMaterial}
            isUserLoggedIn={!!loggedInUser}
          />
        ) : null;
      case 'main':
      default:
        return (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Bem-vindo à EduConnect</h1>
              <p className="mt-4 text-lg text-secondary max-w-2xl mx-auto">
                Sua porta de entrada para o aprendizado colaborativo. Encontre mentores, participe de grupos de estudo e acelere seu crescimento.
              </p>
            </div>

            {/* Mentorships Section */}
            <section id="mentorships" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-primary pb-2">Mentorias Disponíveis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mentorships.map(mentorship => (
                  <MentorshipCard key={mentorship.id} mentorship={mentorship} onDetailsClick={handleViewMentorshipDetails} />
                ))}
              </div>
            </section>

            {/* Study Groups Section */}
            <section id="studygroups">
              <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-primary pb-2">Encontre um Grupo de Estudo</h2>
                <button
                  onClick={() => loggedInUser ? setCreateGroupModalOpen(true) : openLoginModal()}
                  className="flex items-center gap-2 bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark transition-all duration-300"
                  title={!loggedInUser ? "Você precisa estar logado para criar um grupo" : "Criar Novo Grupo"}
                >
                  <PlusIcon />
                  Criar Novo Grupo
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {studyGroups.map(group => (
                  <StudyGroupCard key={group.id} group={group} onDetailsClick={handleViewGroupDetails}/>
                ))}
              </div>
            </section>
          </>
        );
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-light font-sans text-dark">
      <Header 
        user={loggedInUser}
        onLoginClick={openLoginModal}
        onSignUpClick={openSignUpModal}
        onLogoutClick={handleLogout}
        onDashboardClick={handleViewDashboard}
        onHomeClick={handleGoHome}
      />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {renderContent()}
      </main>
      <Footer />

      {/* Modals */}
      <Modal isOpen={isCreateGroupModalOpen} onClose={() => setCreateGroupModalOpen(false)} title="Criar um Novo Grupo de Estudo">
        <CreateStudyGroupForm onCreate={handleCreateStudyGroup} onCancel={() => setCreateGroupModalOpen(false)} />
      </Modal>

      <Modal isOpen={!!selectedMentorship} onClose={() => setSelectedMentorship(null)} title="Detalhes da Mentoria">
        {selectedMentorship && <MentorshipDetails mentorship={selectedMentorship} />}
      </Modal>
      
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal} title="Entrar">
        <LoginForm
            onLogin={handleLogin}
            isLoading={isLoggingIn}
            error={loginError}
        />
      </Modal>

      <Modal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} title="Cadastre-se">
        <SignUpForm
            onSignUp={handleSignUp}
            isLoading={isSigningUp}
            error={signUpError}
            successMessage={signUpSuccess}
        />
      </Modal>
    </div>
  );
};

export default App;