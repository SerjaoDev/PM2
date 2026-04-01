import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { Text, View, Button, TextInput, FlatList } from "react-native";

export default function Banco(){
    
    const db = SQLite.openDatabaseSync["banco.db"];
    const [dados, setDados] = useState([]);
    const [valor, setValor] = useState("");

    function salvarDado(){
        setDados([...dados, valor]);
        setValor("");
    }

    useEffect(() => { db.execSync("CREATE TABLE IF NOT EXISTS DADOS(ID INTEGER PRIMARY KEY AUTO_INCREMENT, VALOR TEXT);"); }, [])
    
    return (
        <View>
            <Text>Banco de dados local</Text>
            <br />
            <TextInput placeholder="Digite algo para salvar" value={valor} onChangeText={setValor}/>
            <Button title="Salvar" onPress={salvarDado}/>
            <br />
            <Text>Dados salvos aparecerão aqui</Text>
            <View>
                <FlatList data={dados} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => <Text>{item}</Text>}/>
            </View>
        </View>
    );
}