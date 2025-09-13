export interface UserProfile {
  name?: string;
  email?: string;
  institute?: string;
  educationLevel?: string;
  grade?: string;
  skills?: string;
  bio?: string;
  avatar?: string | null;
  customAvatar?: File | null;
  // Employer-specific fields
  company?: string;
  contactNumber?: string;
  position?: string;
}

export default UserProfile;
