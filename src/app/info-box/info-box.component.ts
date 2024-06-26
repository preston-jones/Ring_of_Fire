import { Component, Input, inject } from '@angular/core';
import { GamedataService } from '../gamedata.service';

/* -- Imports for Material Dialog and Button -- */
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog} from '@angular/material/dialog';
import { DialogCardInfoComponent } from '../dialog-card-info/dialog-card-info.component';

@Component({
  selector: 'app-info-box',
  standalone: true,
  imports: [
    DialogAddPlayerComponent,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    FormsModule,
    MatFormField,
    MatLabel,
    DialogCardInfoComponent
  ],
  templateUrl: './info-box.component.html',
  styleUrl: './info-box.component.scss'
})
export class InfoBoxComponent {

  gameData = inject(GamedataService);

  constructor(public matDialog: MatDialog) { }


  openCardInfo(): void {
    const dialogRef = this.matDialog.open(DialogCardInfoComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}