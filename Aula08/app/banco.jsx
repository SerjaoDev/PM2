import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function Banco() {

    const db = SQLite.openDatabaseSync("banco.db");
    const [dados, setDados] = useState([]);
    const [valor, setValor] = useState("");
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        db.execSync("CREATE TABLE IF NOT EXISTS DADOS (ID INTEGER PRIMARY KEY AUTOINCREMENT, VALOR TEXT);");
        carregarItems();
    }, []);

    function inserirItem() {
        if (!valor.trim()) {
            return;
        }

        db.runAsync("INSERT INTO DADOS (VALOR) VALUES (?);",[valor]).then(() => {
            console.log("Inserção terminada");
            carregarItems();
            setValor("");
        });
    }

    function carregarItems() {
        db.getAllAsync("SELECT * FROM DADOS;").then((linhas) => {
            setDados(linhas);
        });
    }

    function salvarDado() {
        inserirItem();
    }

    function atualizaDados(ID, VALOR) {
        db.runAsync("UPDATE DADOS SET VALOR = ? WHERE ID = ?", [VALOR, ID]).then(() => {
            carregarItems();
        });
    }

    function iniciarEdicao(item) {
        setValor(item.VALOR);
        setEditando(true);
    }

    return (
        <View style={{ padding: 20 }}>
            <Text>Banco de dados local</Text>
            <TextInput
                placeholder="Digite algo para salvar"
                value={valor}
                onChangeText={setValor}
                style={{
                    borderWidth: 1,
                    marginVertical: 10,
                    padding: 10
                }}
            />
            <Button
                title={editando ? "Atualizar" : "Salvar"}
                onPress={salvarDado}
            />
            <Text style={{ marginTop: 20 }}>
                Dados salvos aparecerão aqui
            </Text>
            <FlatList
                data={dados}
                keyExtractor={(item) => item.ID.toString()}
                renderItem={({ item }) => (
                    <View
                        style={{
                            marginTop: 10,
                            padding: 10,
                            borderWidth: 1
                        }}
                    >
                        <Text>{item.VALOR}</Text>
                        <Button
                            title="Editar"
                            onPress={() => iniciarEdicao(item)}
                        />
                    </View>
                )}
            />
        </View>
    );
}