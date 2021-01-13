import React, { useRef, useState } from 'react';
import { IonApp, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonCol, IonAlert } from '@ionic/react';
import Home from './pages/Home';
import BmiControls from './components/BmiControls'
import BmiResult from './components/BmiResult';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import InputControl from './components/InputControl';


const App: React.FC = () => {
  const [ calculatedBmi, setCalculatedBmi ] = useState<number>();
  const [ error, setError ] = useState<string>();
  const [ calcUnits, setCalclUnits ] = useState<'mkg' | 'ftlbs'>('mkg');

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

const calculateBmi = () => {
  const enteredHeight = heightInputRef.current!.value;
  const enteredWeight = weightInputRef.current!.value;

  if(!enteredHeight || !enteredWeight || +enteredWeight <= 0 || +enteredHeight <= 0){
    setError('Merci de renseigner un nombre')
    return;
}

const weightConversionFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
const heightConversionFactor = calcUnits === 'ftlbs' ? 3.28 : 1;

const weight = +enteredWeight / weightConversionFactor;
const height = +enteredHeight / heightConversionFactor;

  const bmi = weight / (+height * +height);

  setCalculatedBmi(bmi);


  console.log(bmi)
};

const resetInputs = () => {
  weightInputRef.current!.value = '';
  heightInputRef.current!.value = '';
};

const clearError = () => {
  setError('');
}

const selectCalcUnitHandler = (selectedValue: 'mkg' | 'ftlbs') => {
  setCalclUnits(selectedValue)
}

return(
<React.Fragment>
  <IonAlert
  isOpen={!!error}
  message={error}
  buttons={[{text: "Ok", handler: clearError}]}
/>
  <IonApp>
    <IonHeader>
      <IonToolbar color="primary">
          <IonTitle>
            Calculateur d'IMC
        </IonTitle>
      </IonToolbar>
      </IonHeader>
    <IonContent className="ion-padding">
    <IonGrid>
        <IonRow>
          <IonCol>
            <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
          </IonCol>
        </IonRow>
        </IonGrid>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Votre Taille ({calcUnits === 'mkg' ? 'mètre' : 'feet'})</IonLabel>
                <IonInput type="number" ref={heightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Votre Poids ({calcUnits === 'mkg' ? 'kg' : 'lbs'})</IonLabel>
                <IonInput type="number" ref={weightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <BmiControls onCalculate={calculateBmi} onReset={resetInputs}/>
          {calculatedBmi ? ( <IonRow>
          <BmiResult result={calculatedBmi}/>
        </IonRow> ): null }
      </IonGrid>
    </IonContent>
    </IonApp>
    </React.Fragment>
    )
};

export default App;
