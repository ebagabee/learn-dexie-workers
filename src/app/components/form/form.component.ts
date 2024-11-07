import { Component, computed, model, signal } from '@angular/core';
import { Item } from '../../models/item.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  imports: [FormsModule],
})
export class FormComponent {
  name = signal('');
  description = signal('');

  // Model para duas vias de binding com o componente pai
  itemModel = model<Item | null>(null);

  // Computed signal para o item completo
  formData = computed(() => {
    const nameValue = this.name();
    const descriptionValue = this.description();

    if (nameValue && descriptionValue) {
      return {
        name: nameValue,
        description: descriptionValue,
        createdAt: new Date(),
      };
    }
    return null;
  });

  updateName(value: string) {
    this.name.set(value);
    this.updateModel();
  }

  updateDescription(value: string) {
    this.description.set(value);
    this.updateModel();
  }

  updateModel() {
    const data = this.formData();
    if (data) {
      this.itemModel.set(data);
    }
  }

  // Reseta o formulário
  resetForm(): void {
    this.name.set('');
    this.description.set('');
    this.itemModel.set(null);
  }

  onSubmit(): void {
    const data = this.formData();
    if (data) {
      this.itemModel.set(data);
      this.resetForm();
    }
  }
}
