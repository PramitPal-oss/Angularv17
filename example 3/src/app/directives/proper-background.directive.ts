import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProperBackground]'
})
export class ProperBackgroundDirective implements OnInit {

  constructor(private el: ElementRef, private render: Renderer2) { }

  ngOnInit(): void {
    this.render.setStyle(this.el.nativeElement, 'backgroundColor', 'green')

    this.render.setStyle(this.el.nativeElement, 'color', 'black')
  }

}
