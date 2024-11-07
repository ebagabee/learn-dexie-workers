import { Component, computed, model, signal } from '@angular/core';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  standalone: true,
})
export class FormComponent {
  public name = signal('');
  description = signal('');

  // Computed signal para o item completo
  formData = computed(() => ({
    name: this.name(),
    description: this.description(),
    createdAt: new Date(),
  }));

  // Model para duas vias de binding com o componente pai
  public itemModel = model<Item>();

  // Reseta o formulario
  resetForm(): void {
    this.name.set('');
    this.description.set('');
  }

  onSubmit(): void {
    const newItem = this.formData();
    this.itemModel.set(newItem);
    this.resetForm();
  }
}
