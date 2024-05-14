import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../../../features/client/models/client.model';
import { ColumnDefinition } from '../../models/columnDefinitions.model';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  @Input() columnDefinitions: ColumnDefinition[] = [];
  @Input() dataSource: any;
  @Input() highlightedItemId: number = 0;

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) { }
  ngOnInit(): void { }

  get displayedColumns(): string[] {
    return this.columnDefinitions.map(col => col.key);
  }

  selectItem(element: Client) {
    this.sharedService.setFormFields(element);
    setTimeout(() => {
      this.router.navigate([`/client/edit/${element.id}`]);
    }, 5);
  }
}