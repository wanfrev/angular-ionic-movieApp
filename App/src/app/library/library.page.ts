import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface MovieList {
  name: string;
}

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LibraryPage implements OnInit {
  movieLists: MovieList[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    // Asegúrate de que los modales estén ocultos al iniciar
    this.closeAddModal();
    this.closeEditModal();
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  openAddModal() {
    const modal = document.getElementById('addListModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  closeAddModal() {
    const modal = document.getElementById('addListModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  submitAddForm(event: Event) {
    event.preventDefault();
    const input = (event.target as HTMLFormElement).elements.namedItem('listName') as HTMLInputElement;
    const name = input.value;

    if (name) {
      this.movieLists.push({ name });
      this.closeAddModal();
    }
  }

  openEditModal(editIndex: number, event: MouseEvent) {
    const modal = document.getElementById('editListModal');
    const editIndexInput = document.getElementById('editIndex') as HTMLInputElement;
    const listNameInput = document.getElementById('editListName') as HTMLInputElement;

    if (modal && editIndexInput && listNameInput) {
      modal.style.display = 'block';
      editIndexInput.value = editIndex.toString();
      listNameInput.value = this.movieLists[editIndex].name;

      const target = event.target as HTMLElement;
      const listItem = target.closest('.list-item') as HTMLElement;
      if (listItem) {
        const rect = listItem.getBoundingClientRect();
        modal.style.top = `${rect.bottom + window.scrollY}px`;
        modal.style.left = `${rect.left + window.scrollX}px`;
      }
    }
  }

  closeEditModal() {
    const modal = document.getElementById('editListModal');
    const editIndexInput = document.getElementById('editIndex') as HTMLInputElement;
    const listNameInput = document.getElementById('editListName') as HTMLInputElement;

    if (modal && editIndexInput && listNameInput) {
      modal.style.display = 'none';
      editIndexInput.value = '';
      listNameInput.value = '';
    }
  }

  submitEditForm(event: Event) {
    event.preventDefault();
    const input = (event.target as HTMLFormElement).elements.namedItem('editListName') as HTMLInputElement;
    const editIndexInput = (event.target as HTMLFormElement).elements.namedItem('editIndex') as HTMLInputElement;
    const name = input.value;
    const editIndex = editIndexInput.value ? parseInt(editIndexInput.value, 10) : null;

    if (name && editIndex !== null && !isNaN(editIndex)) {
      this.movieLists[editIndex].name = name;
      this.closeEditModal();
    }
  }

  deleteList(list: MovieList) {
    this.movieLists = this.movieLists.filter(l => l !== list);
  }
}
