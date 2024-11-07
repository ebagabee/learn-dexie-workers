import { Component, input } from '@angular/core';
import { Item } from '../../models/item.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-footer-action',
  standalone: true,
  templateUrl: './footer-action.component.html',
})
export class FooterActionComponent {
  formData = input<Item | null>(null);

  constructor(private dataService: DataService) {}

  canSave(): boolean {
    const data = this.formData();
    return (
      data !== null &&
      data.name?.trim() !== '' &&
      data.description?.trim() !== ''
    );
  }

  async onSave(): Promise<void> {
    const data = this.formData();
    if (data) {
      await this.dataService.saveItem(data);
    }
  }
}
