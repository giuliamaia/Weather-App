import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { getWeather } from './service/weather';

interface Weather {
  description: string,
  icon: string,
  id: number,
  main: string,
}

interface Temp {
  feels_like: number,
  humidity: number,
  pressure: number,
  temp: number,
  temp_max: number,
  temp_min: number
}

interface Error {
  cod: string,
  message: string
}

export default function App() {
  const [form, setForm] = useState({
    city: '',
    state: ''
  });
  const [weather, setWeather] = useState({} as Weather);
  const [temp, setTemp] = useState({} as Temp);
  const [alert, setAlert] = useState(false);

  const textInputHandler = (input, text) => {
    setForm((currentForm) => {
        return {
            ...currentForm,
            [input]: text
        }
    })
}
  return (
      <View style={styles.container}>
        <Text style={styles.label}>Digite o nome de uma cidade:</Text>
        <TextInput style={styles.input} placeholder='ex: Recife' onChangeText={(text: string) => textInputHandler('city', text)}/>
        <Text style={styles.label}>Digite o nome do estado dessa cidade:</Text>
        <TextInput style={styles.input} placeholder='ex: Pernambuco' onChangeText={(text: string) => textInputHandler('state', text)}/>
        <Button title='Buscar' onPress={async () => {
          const resp = await getWeather(form)
          if(resp["message"]) {
            setAlert(true)
          }
          else {
            setAlert(false)
            setTemp(resp["main"])
            setWeather(resp["weather"][0])
          }
        }}/>
        <View style={alert ? styles.hide : styles.feedback}>
          <Text style={styles.feedbackText}>Previsão: {weather.description}</Text>
          <Text style={styles.feedbackText}>Temperatura: {temp.temp}</Text>
          <Text style={styles.feedbackText}>Temperatura Máx.: {temp.temp_max}</Text>
          <Text style={styles.feedbackText}>Temperatura Mín.: {temp.temp_min}</Text>
        </View>
        <View style={alert ? styles.feedback: styles.hide} >
          <Text style={styles.feedbackText}>Cidade inválida!</Text>
          <Text style={styles.feedbackText}>Tente novamente...</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedback: {
    padding: 10,
    marginVertical: 10
  },
  feedbackText: {
    fontSize: 18
  },
  input: {
    marginBottom: 15,
    fontSize: 18
  },
  label: {
    fontSize: 18
  },
  hide: {
    display: 'none'
  }
});
