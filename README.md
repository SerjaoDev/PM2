# CÓDIGOS NO TERMINAL
- npx create-expo-app <nome>: Cria o arquivo da aplicação
- npm install expo: Instala o expo na pasta
- npm install expo-sqlite: Instala o banco local
- npm audit fix: Atualiza as bibliotecas se necessário
- npx expo install react-native-web: Instala a biblioteca para rodar o app na web
- npm run reset-project: Reseta o projeto
- npx expo start: Inicia o projeto
- Depois de dar o npx expo start, aperte W para iniciar na web. Se quiser abrir no Android, aperte A

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
# COMENTÁRIOS PARA ESTUDO
**Dentro de banco.jsx**
- Guarda os dados em um estado local
- **Código**: *const [dados, setDados] = useState([]);*

- Guarda o valor digitado no TextInput
- **Código**: *const [valor, setValor] = useState("");*

- Exibe uma lista de valores salvos no estado dados
- **Código**: *<FlatList data={dados} keyExtractor={(item) => index.ID.toString()} renderItem={({ item }) => <Text>{item}</Text>}/>*

- Abre uma conexão com a base de dados sqlite
- **Código**: *const db = SQLite.openDatabaseSync["banco.db"];*

- Cria a tabela DADOS caso ela não exista, necessário para garantir que a base de dados exista e tenha a tabela que esperamos
- **Código**: *useEffect(()=>{db.execSync("CREATE TABLE IF NOT EXISTS DADOS(ID INTEGER PRIMARY KEY AUTO_INCREMENT, VALOR TEXT);");},[])*

- Se o valor digitado contiver apenas espaços, então a função para. O comando 'trim()' remove estes espaços em excesso
- **Código**: *if(!valor.trim()){ return; }*

- Se houver algo para salvar, então executa o insert na base de dados
- **Código**: *db.runAsync("INSERT INTO DADOS (VALOR) VALUES (?);", [valor])*.then(() => {console.log("Inserção terminada"); carregarItems(); setValor("");});
- Informar se o app está em modo de edição
- **Código**: *const [editando, setEditando] = useState(false);*
