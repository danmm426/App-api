import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';

export default function App() {
  
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon');

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = () => {
    setLoading(true);
    fetch(nextUrl)
      .then(res => res.json())
      .then(res => {
        setPokemon(prevPokemon => [...prevPokemon, ...res.results]);
        setNextUrl(res.next);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Pokemon:', error);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Descargando Pokemones...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Listado de pokemones:</Text>
      <View style={{ flex: 1, paddingTop: 10 }}>
        <FlatList
          data={pokemon}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={getPokemon} 
          onEndReachedThreshold={0.1} 
        />
      </View>
      <StatusBar style="auto" />
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
});

