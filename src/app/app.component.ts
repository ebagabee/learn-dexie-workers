import { Component, OnInit, signal } from '@angular/core';
import { Item } from './models/item.model';
import { DataService } from './services/data.service';
import { FormComponent } from './components/form/form.component';
import { FooterActionComponent } from './components/footer-action/footer-action.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormComponent, FooterActionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  styles: [
    `
      .items-list {
        margin-top: 2rem;
      }
      .item {
        padding: 1rem;
        border: 1px solid #ddd;
        margin-bottom: 1rem;
        border-radius: 4px;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  currentItem: Item | null = null;
  items = signal<Item[]>([]);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Inscreve-se no signal do serviço
    this.items = this.dataService.getItems();
  }
}
