import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-compoment',
  templateUrl: './test-compoment.component.html',
  styleUrls: ['./test-compoment.component.css']
})
export class TestCompomentComponent implements OnInit {
  leagueForm: FormGroup;
  hasPreviousNavigation
  constructor(private fb: FormBuilder,public router:Router) {
    this.hasPreviousNavigation = Boolean(this.router.getCurrentNavigation().previousNavigation);
      
   }


  logToConsole(object: any) {
    
  }

  ngOnInit() {
    this.leagueForm = this.fb.group({
      teams: this.fb.array([this.teams])
    });
    this.addTeam();
  }

  get teams(): FormGroup {
    return this.fb.group({
      team_name: "",
      players: this.fb.array([this.players])
    });
  }

  get players(): FormGroup {
    return this.fb.group({
      player_name: "",
      player_number: ""
    });
  }

  addTeam() {
    for (let j = 0; j < 2; j++) {
      (this.leagueForm.get("teams") as FormArray).push(this.teams);
    }
  }

  deleteTeam(index) {
    (this.leagueForm.get("teams") as FormArray).removeAt(index);
  }

  addPlayer(team) {
    team.get("players").push(this.players);
  }

  deletePlayer(team, index) {
    team.get("players").removeAt(index);
  }

}