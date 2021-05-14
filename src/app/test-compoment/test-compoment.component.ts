import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";

@Component({
  selector: 'app-test-compoment',
  templateUrl: './test-compoment.component.html',
  styleUrls: ['./test-compoment.component.css']
})
export class TestCompomentComponent implements OnInit {
  leagueForm: FormGroup;

  constructor(private fb: FormBuilder) { }


  logToConsole(object: any) {
    console.log(object);
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