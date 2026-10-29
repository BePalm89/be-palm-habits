import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideDynamicIcon, LucideIcon } from '@lucide/angular';

export type TabItem = {
  path: string;
  label: string;
  exact: boolean;
  icon: LucideIcon;
};

@Component({
  imports: [RouterLink, RouterLinkActive, LucideDynamicIcon],
  selector: 'app-tab-bar',
  styleUrl: './tab-bar.css',
  templateUrl: './tab-bar.html',
})
export class TabBar {
  readonly tabs = input.required<TabItem[]>();
}
