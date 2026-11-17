import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Project {
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  teamContext?: string;
  highlights?: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

export interface SkillCategory {
  _id?: string;
  category: string;
  skills: { name: string; }[];
}

export interface Experience {
  _id?: string;
  company: string;
  position: string;
  startDate?: string;
  endDate?: string;
  currentlyWorking: boolean;
  description?: string;
  responsibilities: string[];
}

export interface Education {
  _id?: string;
  qualification: string;
  institution: string;
  period: string;
  result: string;
}

export interface Internship {
  _id?: string;
  position: string;
  company: string;
  location?: string;
  period: string;
  responsibilities: string[];
}

export interface Certification {
  _id?: string;
  name: string;
  issuer: string;
}

@Injectable({ providedIn: 'root' })
export class PortfolioApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api';

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  getSkills(): Observable<SkillCategory[]> {
    return this.http.get<SkillCategory[]>(`${this.apiUrl}/skills`);
  }

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/experience`);
  }

  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.apiUrl}/education`);
  }

  getInternships(): Observable<Internship[]> {
    return this.http.get<Internship[]>(`${this.apiUrl}/internships`);
  }

  getCertifications(): Observable<Certification[]> {
    return this.http.get<Certification[]>(`${this.apiUrl}/certifications`);
  }
}
