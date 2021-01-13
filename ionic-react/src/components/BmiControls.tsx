import React from 'react';
import { IonButton, IonIcon, IonRow, IonCol } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';

const BmiControls: React.FC<{onCalculate: () => void; onReset: () => void}> = props => {
    return (
        <IonRow>
            <IonCol className="ion-text-left">
            <IonButton onClick={props.onCalculate}>
                <IonIcon slot="start" icon={ calculatorOutline }/>
                Calculer
            </IonButton>
            </IonCol>
            <IonCol className="ion-text-right">
            <IonButton onClick={props.onReset}>
                <IonIcon slot="start" icon={ refreshOutline }/>
                Réinitialiser
            </IonButton>
            </IonCol>
        </IonRow>
    )
} 

export default BmiControls;