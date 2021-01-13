import React from 'react';
import { IonButton, IonIcon, IonRow, IonCol, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';

const InputControl: React.FC<{selectedValue: 'mkg' | 'ftlbs'; onSelectValue: (value: 'mkg' | 'ftlbs') => void }> = props => {
    const inputChangeHandler = (event: CustomEvent) => {
        props.onSelectValue(event.detail.value)
    }
    return (
        <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler}>
            <IonSegmentButton value="mkg">
            <IonLabel>m/kg</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="ftlbs">
            <IonLabel>ft/lbs</IonLabel>
            </IonSegmentButton>
        </IonSegment>
    )
} 

export default InputControl;

