import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";


export default function Banco() {
    const db = SQLite.openDatabaseSync("banco2.db");
    const [dados, setDados] = useState([]);
    const [valor, setValor] = useState("");
    const [editando, setEditando] = useState(false);
    const [idSendoEditado, setIdSendoEditado] = useState(0);
    const [apagado, setApagado] = useState(false);

    useEffect(() => {
        db.execSync("CREATE TABLE IF NOT EXISTS DADOS (id INTEGER PRIMARY KEY AUTOINCREMENT, valor TEXT);");
        carregarItems();
    }, []);


    function inserirItem(){
        if(!valor.trim()){
            return;
        }

        db.runAsync("INSERT INTO DADOS (valor) VALUES (?);", [valor]).then(
            () => {
                console.log("Inserção terminada")
            }
        )
    }


    function carregarItems(){
        db.getAllAsync("SELECT * FROM DADOS;").then(
            (linhas) => {
                setDados(linhas)
            }
        )
    }
    
    function salvarDado() {        
        inserirItem();
        carregarItems();
        setValor("");
    }

    function atualizaDados(id, valor){
        db.runAsync("UPDATE DADOS SET valor = ? WHERE id = ?", 
            [ valor, id ]
        ).then(
            carregarItems()
        )
    }

    function apagarDados(id, valor){
        db.runAsync("DELETE FROM DADOS WHERE id = ?", 
            [ valor, id ]
        ).then(
            carregarItems()
        )
    }

    function iniciarEdicao(item){
        setEditando(true)
        setValor(item.valor)
        setIdSendoEditado(item.id)
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
                title={editando ? "Atualizar" : "Salvar"}
                onPress={() => {
                    if(editando){
                        atualizaDados(idSendoEditado, valor);
                        setEditando(false);
                        setIdSendoEditado(0);
                        setValor("");
                    }else{
                        salvarDado();
                    }
                }}
            />
            <Text>Dados salvos aparecerão aqui</Text>
            <View>
                {}
                <FlatList
                    data={dados}
                    keyExtractor={
                        (item) => item.id.toString()
                    }
                    renderItem={
                        ({ item }) => (
                            <>
                                <Text>{item.valor}</Text>
                                <Button 
                                    title="Editar"
                                    onPress={
                                        () => iniciarEdicao(item)
                                    }
                                />
                                <Button 
                                    title="Apagar"
                                    onPress={
                                        () => {
                                        if(apagado){
                                           apagarDados(valor);
                                        }}
                                    }
                                />
                            </>
                        )
                    }
                />
            </View>
        </View>
    );
}