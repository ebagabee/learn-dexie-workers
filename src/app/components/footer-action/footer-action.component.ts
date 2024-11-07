import { Component, input } from '@angular/core';
import { Item } from '../../models/item.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-footer-action',
  standalone: true,
  templateUrl: './footer-action.component.html',
})
export class FooterActionComponent {
  public formData = input.required<Item>();

  constructor(private dataService: DataService) {}

  async onSave(): Promise<void> {
    if (this.formData()) {
      await this.dataService.saveItem(this.formData());
    }
  }
}
