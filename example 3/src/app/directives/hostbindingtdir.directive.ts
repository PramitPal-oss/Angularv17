import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHostbindingtdir]'
})
export class HostbindingtdirDirective {

  constructor() { }

  @HostBinding('style.transform') transform: string = 'scale(1)'
  @HostBinding('style.transition') transition: string = 'transform 0.3s ease-in-out'
  @HostListener('mouseenter') onMouseEnter() {
    this.transform = 'scale(0.75)'
  }

  @HostListener('mouseleave') onMouseOut() {
    this.transform = 'scale(1)'
  }

}
