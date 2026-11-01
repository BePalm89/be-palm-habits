import { Component, input } from '@angular/core';
import { Category } from '../../habits/habit.model';

@Component({
  imports: [],
  selector: 'app-avatar-category',
  styleUrl: './avatar-category.css',
  templateUrl: './avatar-category.html',
  host: { '[attr.data-category]': 'category()' },
})
export class AvatarCategory {
  readonly category = input.required<Category>();
}
