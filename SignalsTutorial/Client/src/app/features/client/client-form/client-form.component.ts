import { Component, effect, inject, Injector, OnInit, runInInjectionContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { Location } from '@angular/common';
import { SharedService } from '../../../shared/services/shared.service';
import { Client } from '../models/client.model';
import { LineOfBusiness } from '../models/lineOfBusiness.model';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup;
  myOptions: string[] = [];

  clientId: number | null = null;
  mainTitle: string = 'Add New Client';
  clientData: Client | null = null;
  //
  private sharedService = inject(SharedService);
  private injector = inject(Injector);

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.paramMap.subscribe(params => {
      this.clientId = parseInt(params.get('id')!, 10);
      if (this.clientId > 0) {
        this.mainTitle = 'Edit Client'
      }
    });

    this.clientForm = this.formBuilder.group({
      clientname: ['', Validators.required],
      clientnote: [''],
      clienttype: ['', Validators.required],
      lineofbusiness: ['']
    });
  }

  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.clientData = this.sharedService.form();
        if (this.clientData) {
          this.clientForm.setValue({
            clientname: this.clientData.clientName,
            clientnote: this.clientData.clientNote,
            clienttype: this.clientData.clientType,
            lineofbusiness: this.clientData.lineOfBusiness
          });
        }
      });
    });
    this.fetchLineOfBusiness();
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const formValues = { ...this.clientForm.value, id: this.clientId };
      this.clientService
        .addUpdateClient(formValues)
        .subscribe(() => {
          this.router.navigate(['/client']);
        });
    }
  }

  onOptionSelected(option: string): void {
    this.clientForm.controls['lineofbusiness'].setValue(option);
  }

  back() {
    this.location.back();
  }

  private fetchLineOfBusiness() {
    return this.clientService
      .getLineOfBusiness()
      .subscribe((lobList: any) => {
        const lob: LineOfBusiness[] = lobList.data;
        lob.filter((item: LineOfBusiness) => item.isactive.toString() === 'true')
          .forEach((lobItem) => {
            this.myOptions.push(lobItem.lineofbusiness);
          });

        this.myOptions.sort();
      });
  }
}
