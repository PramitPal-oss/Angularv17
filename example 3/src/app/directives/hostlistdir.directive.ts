import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHostlistdir]'
})
export class HostlistdirDirective {

  constructor(private el: ElementRef, private render: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.render.addClass(this.el.nativeElement, 'highlight-product');
  }

  @HostListener('mouseleave') onMouseOut() {
    this.render.removeClass(this.el.nativeElement, 'highlight-product');
  }
}
