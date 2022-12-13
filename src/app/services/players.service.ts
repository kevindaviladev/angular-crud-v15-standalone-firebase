import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { collection, getDocs } from '@firebase/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Player } from '../commons/interfaces/player.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private playerSource = new BehaviorSubject<any | null>(null);
  players$ = this.playerSource.asObservable();

  constructor(private firestore: Firestore) {}

  addPlayer(player: Player) {
    const playersRef = collection(this.firestore, 'players');
    return addDoc(playersRef, player);
  }

  getPlayers(filter = '') {
    const playersRef = collection(this.firestore, 'players');
    let q = query(playersRef);
    if (filter) {
      q = query(playersRef, where('name', '==', filter));
    }
    return collectionData(q) as unknown as Observable<Player[]>;
  }

  async updatePlayer(player: Player) {
    const playersRef = collection(this.firestore, 'players');
    let q = query(playersRef, where('id', '==', player.id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'players', document.id);
      await updateDoc(docRef, { ...player });
    });
  }

  async deletePlayer(id: string) {
    const playersRef = collection(this.firestore, 'players');
    let q = query(playersRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'players', document.id);
      deleteDoc(docRef);
    });
  }
}
