import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSetBackDynamic]'
})
export class SetBackDynamicDirective implements OnInit {

  @Input('appSetBackDynamic')
  appSetBackDynamic: { backgroundColor: string, color: string } = { backgroundColor: 'blue', color: 'white' }

  constructor(private el: ElementRef, private render: Renderer2) { }

  ngOnInit(): void {
    this.render.addClass(this.el.nativeElement, this.appSetBackDynamic.backgroundColor)
    this.render.addClass(this.el.nativeElement, this.appSetBackDynamic.color)
  }

}
