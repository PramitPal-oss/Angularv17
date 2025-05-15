import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  @ViewChild('searchVar')
  searchInput: ElementRef;

  router: Router = inject(Router)

  onSearchSubmit() {
    const searchInputValue = this.searchInput.nativeElement.value
    if (!searchInputValue) return;
    this.router.navigate(['courses'], { queryParams: { search: searchInputValue } })
    this.searchInput.nativeElement.value = ''
  }
}
