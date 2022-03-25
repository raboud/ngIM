import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginatedDataSource } from 'randr-lib';
import { User } from '../../../models/user.model';
import { UserListQuery, UserService } from '../../../services/user.service ';

@Component({
  selector: 'app-measure-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  data: User[] = [];
  listQuery: UserListQuery = {
    role: "Measurer",
    active: true
  };

  constructor(private dataService: UserService) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    this.dataService.getList(this.listQuery).subscribe((item) => {
      this.data = item;
      console.log(this.data);
    });
  }

  select(id: number){
    console.log(id);
  }

  sync() {
    this.dataService.sync().subscribe();
  }
}


