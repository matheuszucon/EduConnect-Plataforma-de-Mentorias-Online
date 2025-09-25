export interface Mentorship {
  id: number;
  mentorName: string;
  mentorTitle: string;
  topic: string;
  description: string;
  date: string;
  duration: string;
  tags: string[];
  avatarUrl: string;
}

export interface Member {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Material {
  id: number;
  type: 'link' | 'pdf' | 'video';
  title: string;
  url: string;
  sharedBy: string;
  sharedAt: string;
}

export interface StudyGroup {
  id: number;
  name: string;
  subject: string;
  description: string;
  members: number;
  maxMembers: number;
  imageUrl: string;
  membersList: Member[];
  materials: Material[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  mentorshipIds?: number[];
  studyGroupIds?: number[];
}