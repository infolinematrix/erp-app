import { NgClass } from '@angular/common';
import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  Form,
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { toast } from 'ngx-sonner';
import { SelectModule } from 'primeng/select';
import { PickupService } from 'src/app/core/services/pickup.service';
import { Pickups } from 'src/shared';

@Component({
  selector: 'app-pickup-select',
  imports: [SelectModule, ReactiveFormsModule, FormsModule],
  templateUrl: './pickup-select.component.html',
  styleUrls: ['./pickup-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PickupSelectComponent),
      multi: true,
    },
  ],
})
export class PickupSelectComponent
  implements ControlValueAccessor, OnInit, OnChanges
{
  @Input() pickupCode = 0;
  items: any[] = [];
  selectedId: number | null = null;

  private onChange: (val: any) => void = () => {};
  private onTouched: () => void = () => {};
  private pendingId: number | null = null;

  constructor(private pickupService: PickupService) {}

  ngOnInit() {
    this.loadItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pickupCode']) {
      this.loadItems();
    }
  }

  writeValue(value: any): void {
    if (!this.items.length) {
      this.pendingId = value;
    } else {
      this.selectedId = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  async loadItems() {
    try {
      this.items = await this.pickupService.getItemsByPickupCode(
        this.pickupCode
      );

      const idToSelect = this.pendingId ?? this.selectedId;
      const match = this.items.find((i) => i.id === idToSelect);
      this.selectedId = match?.id ?? null;

      this.pendingId = null;
    } catch (err) {
      this.items = [];
      this.selectedId = null;
    }
  }

  onSelectChange(value: any) {
    this.onChange(value);
  }
}
