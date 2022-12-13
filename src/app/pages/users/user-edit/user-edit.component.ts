import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PlayersService } from 'src/app/services/players.service';
import { Player } from 'src/app/commons/interfaces/player.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
  _location = inject(Location);
  _playerService = inject(PlayersService);
  _router = inject(Router);
  player!: Player;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    decks: new FormArray([]),
  });

  ngOnInit() {
    console.log(this._location.getState());
    this.player = (this._location.getState() as any).player as Player;
    if (this.player) this.setCurrentPlayer(this.player);
  }

  createDeck() {
    (this.form.get('decks') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        cards: new FormControl(null, Validators.required),
      })
    );
  }

  setCurrentPlayer(player: any) {
    this.form.patchValue(player);
    player.decks.map((deck: any) => {
      const deckForm = new FormGroup({
        name: new FormControl(deck.name),
        cards: new FormControl(deck.cards),
      });
      (this.form.get('decks') as FormArray).push(deckForm);
    });
  }

  get decks() {
    return (this.form.get('decks') as FormArray).controls;
  }

  updatePlayer() {
    console.log({
      id: this.player.id,
      ...this.form.getRawValue(),
    });

    this._playerService.updatePlayer({
      id: this.player.id,
      ...this.form.getRawValue(),
    } as Player);
    this._router.navigate(['users']);
  }
}
