const firebaseConfig = {
    apiKey: "AIzaSyDlfsgnlW_bEaScNBBbiHsSMVPqesBRl_I",
    authDomain: "site-monsterzilla.firebaseapp.com",
    databaseURL: "https://site-monsterzilla-default-rtdb.firebaseio.com",
    projectId: "site-monsterzilla",
    storageBucket: "site-monsterzilla.appspot.com",
    messagingSenderId: "28236738932",
    appId: "1:28236738932:web:d1a5be3a66daaf7d6ffc21"
  };
  firebase.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
        var name=user.email;
        name = name.toString();
        name = name.replace("@gmail.com", "");
        document.getElementById("a").innerHTML=name;
        var link = document.getElementById("a");
        link.getAttribute("href");
        link.setAttribute("href",
            "pages/User/user.html");
        console.log(user)
    }else{
        document.getElementById("a").innerHTML="Iniciar Sessão";
    }
})
  
  //Tabelas
  const db = firebase.firestore();
  const storage = firebase.storage();

function cadastrar(){
    const nome = document.getElementById("nome").value;
    const id = document.getElementById("id").value;
    const valor = document.getElementById("valor").value;
    const desc = document.getElementById("desc").value;
    
    const foto = document.getElementById("foto").files[0];

    //upload da foto
    const storageref=firebase.storage().ref();
    const fotoref = storageref.child(`images/${nome}.jpeg`)

    fotoref.put(foto).then(snapshot => {
        console.log(fotoref)
        return snapshot.ref.getDownloadURL();
    }).then(fotoURL =>{
        
        db.collection("Jogos").doc(id).set({
            desc: desc,
            valor: valor,
            foto: nome,
            nome: nome,
            id: id
        })
    })
    alert("Produto cadastrado")

    const nomee = document.getElementById("nome").value="";
    const idd = document.getElementById("id").value="";
    const valorr = document.getElementById("valor").value=0;
    const descc = document.getElementById("desc").value="";
    const fotoo = document.getElementById("foto").value="";
}

function pesquisar(){
    const id = document.getElementById("id_p").value;

    
    db.collection("Jogos").doc(id).get().then(function (doc){
        if (doc.exists) {
            console.log("Document data:", doc.data());
            const dados=doc.data();
            console.log(dados.desc);
            const desc = document.getElementById("desc_p").value = dados.desc;
            const valor = document.getElementById("valor_p").value = dados.valor;
            const nome = document.getElementById("nome_p").value = dados.nome;

            const div = document.getElementById("image");
            const photoPath = `images/${dados.foto}.jpeg`;
            var photoRef = storage.ref(photoPath);
            console.log(photoRef);

            photoRef.getDownloadURL(photoRef).then((url) => {
                console.log(url)
                const img = document.getElementById("img");
                img.src = url;
                img.style.width="100%";
                
                div.appendChild(img);
            }).catch((error)=>{
                console.log(error)
            });

        } else {
            // doc.data() will be undefined in this case
            alert("Esse documento não existe");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function alterar(){
    const nome = document.getElementById("nome_p").value;
    const id = document.getElementById("id_p").value;
    const valor = document.getElementById("valor_p").value;
    const desc = document.getElementById("desc_p").value;
    

    //upload da foto
    const storageref=firebase.storage().ref();
    const fotoref = storageref.child(`images/${nome}`)

    fotoref.put(foto).then(snapshot => {
        console.log(fotoref)
        return snapshot.ref.getDownloadURL();
    }).then(fotoURL =>{
        
        db.collection("Jogos").doc(id).set({
            desc: desc,
            valor: valor,
            foto: nome,
            nome: nome,
            id: id
        })
    })
    alert("Produto cadastrado")
}