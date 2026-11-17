import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  Certification,
  Education,
  Internship,
  PortfolioApiService,
  Project,
  SkillCategory
} from './portfolio-api.service';

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  isDarkTheme = true;
  navOpen = false;
  contactMessage = '';
  messageType: 'success' | 'error' = 'success';
  isSubmitting = false;
  projects = signal<Project[]>([]);
  skills = signal<SkillCategory[]>([]);
  education = signal<Education[]>([]);
  internships = signal<Internship[]>([]);
  certifications = signal<Certification[]>([]);
  projectsLoading = signal(true);
  skillsLoading = signal(true);
  educationLoading = signal(true);
  internshipLoading = signal(true);
  certificationsLoading = signal(true);
  projectsError = signal('');
  skillsError = signal('');
  educationError = signal('');
  internshipError = signal('');
  certificationsError = signal('');
  @ViewChild('contactForm') contactForm!: NgForm;

  constructor(private readonly portfolioApi: PortfolioApiService) {}

  ngOnInit() {
    this.loadTheme();
    this.loadPortfolioData();
  }

  loadPortfolioData() {
    this.portfolioApi.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.projectsLoading.set(false);
      },
      error: (error: unknown) => {
        console.error('Failed to load projects:', error);
        this.projectsError.set('Could not load projects. Check that the backend and database are running.');
        this.projectsLoading.set(false);
      }
    });

    this.portfolioApi.getSkills().subscribe({
      next: (skills) => {
        this.skills.set(skills);
        this.skillsLoading.set(false);
      },
      error: (error: unknown) => {
        console.error('Failed to load skills:', error);
        this.skillsError.set('Could not load skills. Check that the backend and database are running.');
        this.skillsLoading.set(false);
      }
    });

    this.portfolioApi.getEducation().subscribe({
      next: (education) => {
        this.education.set(education);
        this.educationLoading.set(false);
      },
      error: (error: unknown) => {
        console.error('Failed to load education:', error);
        this.educationError.set('Could not load education. Check that the backend and database are running.');
        this.educationLoading.set(false);
      }
    });

    this.portfolioApi.getInternships().subscribe({
      next: (internships) => {
        this.internships.set(internships);
        this.internshipLoading.set(false);
      },
      error: (error: unknown) => {
        console.error('Failed to load internships:', error);
        this.internshipError.set('Could not load internships. Check that the backend and database are running.');
        this.internshipLoading.set(false);
      }
    });

    this.portfolioApi.getCertifications().subscribe({
      next: (certifications) => {
        this.certifications.set(certifications);
        this.certificationsLoading.set(false);
      },
      error: (error: unknown) => {
        console.error('Failed to load certifications:', error);
        this.certificationsError.set('Could not load certifications. Check that the backend and database are running.');
        this.certificationsLoading.set(false);
      }
    });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const theme = this.isDarkTheme ? 'dark-theme' : 'light-theme';
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    this.isDarkTheme = savedTheme === 'dark-theme';
    document.body.className = savedTheme;
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  closeNav() {
    this.navOpen = false;
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      this.contactMessage = 'Please fill all fields correctly';
      this.messageType = 'error';
      return;
    }

    this.isSubmitting = true;
    
    const templateParams = {
      to_email: 'sonysgujaran@gmail.com',
      from_email: this.contactForm.value.email,
      from_name: this.contactForm.value.name,
      message: this.contactForm.value.message
    };

    // emailjs.send('service_95r61mm', 'template_vdgohws', templateParams)
    //   .then((response) => {
    //     console.log('Email sent successfully:', response);
    //     this.contactMessage = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
    //     this.messageType = 'success';
    //     this.isSubmitting = false;
    //     this.contactForm.resetForm();
        
    //     // Clear message after 5 seconds
    //     setTimeout(() => {
    //       this.contactMessage = '';
    //     }, 5000);
    //   })
    //   .catch((error) => {
    //     console.error('Error sending email:', error);
    //     this.contactMessage = 'Error sending message. Please try again or contact me directly at kanishsnh@gmail.com';
    //     this.messageType = 'error';
    //     this.isSubmitting = false;
        
    //     // Clear message after 5 seconds
    //     setTimeout(() => {
    //       this.contactMessage = '';
    //     }, 5000);
    //   });
  }
}