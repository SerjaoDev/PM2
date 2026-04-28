import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";


export default function Banco() {

    const db = SQLite.openDatabaseSync("banco.db");
    const [dados, setDados] = useState([]);
    const [valor, setValor] = useState("");

    useEffect(() => {
        db.execSync("CREATE TABLE IF NOT EXISTS DADOS (ID INTEGER PRIMARY KEY AUTOINCREMENT, VALOR TEXT);");
    }, []);


    function salvarDado() {
        setDados([...dados, valor]);
        setValor("");
    }


    return (
        <View>
            <Text>Banco de dados local</Text>
            <TextInput
                placeholder="Digite algo para salvar"
                value={valor}
                onChangeText={setValor}
            />
            <Button
                title="Salvar"
                onPress={salvarDado}
            />
            <Text>Dados salvos aparecerão aqui</Text>
            <View>
                {}
                <FlatList
                    data={dados}
                    keyExtractor={
                        (item, index) => index.toString()
                    }
                    renderItem={
                        ({ item }) =>
                            <Text>{item}</Text>
                    }
                />
            </View>
        </View>
    );
}