export type Language = 'english' | 'spanish' | 'french' | 'japanese';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  learned?: boolean;
}

export interface LanguageData {
  language: Language;
  flashcards: Flashcard[];
}

const travelPhrases = [
  { 
    en: 'Could you please take a picture of us?', 
    es: '¿Podría tomar una foto de nosotros, por favor?', 
    fr: 'Pourriez-vous prendre une photo de nous, s’il vous plaît ?', 
    ja: '写真を撮ってもらえますか？' 
  },
  { 
    en: 'I have a reservation under the name of...', 
    es: 'Tengo una reserva a nombre de...', 
    fr: 'J’ai une réservation au nom de...', 
    ja: '予約は...の名前でしています。' 
  },
  { 
    en: 'Can you recommend a good local restaurant?', 
    es: '¿Puede recomendarme un buen restaurante local?', 
    fr: 'Pouvez-vous recommander un bon restaurant local ?', 
    ja: 'おすすめの地元のレストランはありますか？' 
  },
  { 
    en: 'I’m allergic to shellfish.', 
    es: 'Soy alérgico a los mariscos.', 
    fr: 'Je suis allergique aux fruits de mer.', 
    ja: '甲殻類アレルギーです。' 
  },
  { 
    en: 'Where can I buy a SIM card?', 
    es: '¿Dónde puedo comprar una tarjeta SIM?', 
    fr: 'Où puis-je acheter une carte SIM ?', 
    ja: 'SIMカードはどこで買えますか？' 
  },
  { 
    en: 'What time does the last train leave?', 
    es: '¿A qué hora sale el último tren?', 
    fr: 'À quelle heure part le dernier train ?', 
    ja: '最終電車は何時に出ますか？' 
  },
  { 
    en: 'Can I pay with a credit card?', 
    es: '¿Puedo pagar con tarjeta de crédito?', 
    fr: 'Puis-je payer par carte de crédit ?', 
    ja: 'クレジットカードで支払えますか？' 
  },
  { 
    en: 'I lost my passport.', 
    es: 'Perdí mi pasaporte.', 
    fr: 'J’ai perdu mon passeport.', 
    ja: 'パスポートをなくしました。' 
  },
  { 
    en: 'Is there a pharmacy nearby?', 
    es: '¿Hay una farmacia cerca?', 
    fr: 'Y a-t-il une pharmacie à proximité ?', 
    ja: '近くに薬局はありますか？' 
  },
  { 
    en: 'Where can I find a taxi?', 
    es: '¿Dónde puedo encontrar un taxi?', 
    fr: 'Où puis-je trouver un taxi ?', 
    ja: 'タクシーはどこで見つかりますか？' 
  }
];

const commonPhrases = [
  { 
    en: 'It’s nice to see you again.', 
    es: 'Me alegra verte de nuevo.', 
    fr: 'Je suis content de te revoir.', 
    ja: 'また会えて嬉しいです。' 
  },
  { 
    en: 'Have a safe trip!', 
    es: '¡Que tengas un buen viaje!', 
    fr: 'Bon voyage !', 
    ja: '良い旅を！' 
  },
  { 
    en: 'I hope you’re doing well.', 
    es: 'Espero que estés bien.', 
    fr: 'J’espère que tu vas bien.', 
    ja: '元気にしているといいですね。' 
  },
  { 
    en: 'It’s been a long time.', 
    es: 'Ha pasado mucho tiempo.', 
    fr: 'Ça fait longtemps.', 
    ja: 'お久しぶりです。' 
  },
  { 
    en: 'I really appreciate your help.', 
    es: 'Realmente aprecio tu ayuda.', 
    fr: 'J’apprécie vraiment ton aide.', 
    ja: '助けてくれて本当にありがとうございます。' 
  },
  { 
    en: 'That sounds great!', 
    es: '¡Suena genial!', 
    fr: 'Ça a l’air génial !', 
    ja: 'それは素晴らしいですね！' 
  },
  { 
    en: 'I hope to see you soon.', 
    es: 'Espero verte pronto.', 
    fr: 'J’espère te voir bientôt.', 
    ja: 'またすぐに会えるといいですね。' 
  },
  { 
    en: 'Take it easy.', 
    es: 'Tómalo con calma.', 
    fr: 'Vas-y doucement.', 
    ja: '無理しないでください。' 
  },
  { 
    en: 'Everything will be okay.', 
    es: 'Todo estará bien.', 
    fr: 'Tout ira bien.', 
    ja: 'きっと大丈夫です。' 
  },
  { 
    en: 'What do you think?', 
    es: '¿Qué piensas?', 
    fr: 'Qu’en penses-tu ?', 
    ja: 'どう思いますか？' 
  },
  { 
    en: 'That’s a good idea.', 
    es: 'Es una buena idea.', 
    fr: 'C’est une bonne idée.', 
    ja: '良い考えですね。' 
  },
  { 
    en: 'I completely agree.', 
    es: 'Estoy totalmente de acuerdo.', 
    fr: 'Je suis entièrement d’accord.', 
    ja: '完全に同意します。' 
  },
  { 
    en: 'I’ll be right back.', 
    es: 'Regreso enseguida.', 
    fr: 'Je reviens tout de suite.', 
    ja: 'すぐ戻ります。' 
  },
  { 
    en: 'Please wait a moment.', 
    es: 'Por favor, espera un momento.', 
    fr: 'Veuillez attendre un instant, s’il vous plaît.', 
    ja: '少々お待ちください。' 
  },
  { 
    en: 'I’m looking forward to it.', 
    es: 'Lo estoy esperando con ilusión.', 
    fr: 'J’ai hâte.', 
    ja: '楽しみにしています。' 
  },
  { 
    en: 'It was delicious.', 
    es: 'Estaba delicioso.', 
    fr: 'C’était délicieux.', 
    ja: 'とても美味しかったです。' 
  },
  { 
    en: 'I’m really tired today.', 
    es: 'Estoy muy cansado hoy.', 
    fr: 'Je suis vraiment fatigué aujourd’hui.', 
    ja: '今日は本当に疲れました。' 
  },
  { 
    en: 'I had a great time.', 
    es: 'Lo pasé muy bien.', 
    fr: 'Je me suis bien amusé.', 
    ja: 'とても楽しかったです。' 
  },
  { 
    en: 'Call me if you need anything.', 
    es: 'Llámame si necesitas algo.', 
    fr: 'Appelle-moi si tu as besoin de quelque chose.', 
    ja: '何かあったら電話してください。' 
  },
  { 
    en: 'See you tomorrow.', 
    es: 'Nos vemos mañana.', 
    fr: 'À demain.', 
    ja: 'また明日。' 
  }
];

const numbers = [
  {
    en: 'There are two of us.',
    es: 'Somos dos.',
    fr: 'Nous sommes deux.',
    ja: '二人です。'
  },
  {
    en: 'There are four of us.',
    es: 'Somos cuatro.',
    fr: 'Nous sommes quatre.',
    ja: '四人です。'
  },
  {
    en: 'I need one ticket, please.',
    es: 'Necesito un boleto, por favor.',
    fr: 'Je voudrais un billet, s’il vous plaît.',
    ja: 'チケットを一枚お願いします。'
  },
  {
    en: 'I need two tickets, please.',
    es: 'Necesito dos boletos, por favor.',
    fr: 'Je voudrais deux billets, s’il vous plaît.',
    ja: 'チケットを二枚お願いします。'
  },
  {
    en: 'A table for two, please.',
    es: 'Una mesa para dos, por favor.',
    fr: 'Une table pour deux, s’il vous plaît.',
    ja: '二人用の席をお願いします。'
  },
  {
    en: 'A table for four, please.',
    es: 'Una mesa para cuatro, por favor.',
    fr: 'Une table pour quatre, s’il vous plaît.',
    ja: '四人用の席をお願いします。'
  },
  {
    en: 'I will stay for one night.',
    es: 'Me quedaré una noche.',
    fr: 'Je vais rester une nuit.',
    ja: '一泊します。'
  },
  {
    en: 'I will stay for three nights.',
    es: 'Me quedaré tres noches.',
    fr: 'Je vais rester trois nuits.',
    ja: '三泊します。'
  },
  {
    en: 'At what time does it open?',
    es: '¿A qué hora abre?',
    fr: 'À quelle heure ça ouvre ?',
    ja: '何時に開きますか？'
  },
  {
    en: 'At what time does it close?',
    es: '¿A qué hora cierra?',
    fr: 'À quelle heure ça ferme ?',
    ja: '何時に閉まりますか？'
  },
  {
    en: 'What time is the last train?',
    es: '¿A qué hora es el último tren?',
    fr: 'À quelle heure est le dernier train ?',
    ja: '最終電車は何時ですか？'
  },
  {
    en: 'How many stops are left?',
    es: '¿Cuántas paradas faltan?',
    fr: 'Combien d’arrêts restent-il ?',
    ja: 'あと何駅ですか？'
  },
  {
    en: 'How many people are in your group?',
    es: '¿Cuántas personas hay en su grupo?',
    fr: 'Vous êtes combien de personnes ?',
    ja: '何人のグループですか？'
  },
  {
    en: 'I would like one bottle of water.',
    es: 'Quisiera una botella de agua.',
    fr: 'Je voudrais une bouteille d’eau.',
    ja: '水を一本ください。'
  },
  {
    en: 'I would like two beers, please.',
    es: 'Quisiera dos cervezas, por favor.',
    fr: 'Je voudrais deux bières, s’il vous plaît.',
    ja: 'ビールを二つください。'
  }
];


const colors = [
  { 
    en: 'I like the blue one.', 
    es: 'Me gusta el azul.', 
    fr: 'J’aime le bleu.', 
    ja: '青が好きです。' 
  },
  { 
    en: 'Do you have this in red?', 
    es: '¿Lo tiene en rojo?', 
    fr: 'L’avez-vous en rouge ?', 
    ja: '赤色はありますか？' 
  },
  { 
    en: 'The green shirt is cheaper.', 
    es: 'La camisa verde es más barata.', 
    fr: 'La chemise verte est moins chère.', 
    ja: '緑のシャツのほうが安いです。' 
  },
  { 
    en: 'I prefer the black one.', 
    es: 'Prefiero el negro.', 
    fr: 'Je préfère le noir.', 
    ja: '黒のほうが好きです。' 
  },
  { 
    en: 'That white car is mine.', 
    es: 'Ese coche blanco es mío.', 
    fr: 'Cette voiture blanche est à moi.', 
    ja: 'あの白い車は私のです。' 
  },
  { 
    en: 'The red bag is very nice.', 
    es: 'El bolso rojo es muy bonito.', 
    fr: 'Le sac rouge est très joli.', 
    ja: '赤いバッグはとても素敵です。' 
  },
  { 
    en: 'Which color do you like?', 
    es: '¿Qué color te gusta?', 
    fr: 'Quelle couleur aimes-tu ?', 
    ja: 'どんな色が好きですか？' 
  },
  { 
    en: 'My favorite color is green.', 
    es: 'Mi color favorito es el verde.', 
    fr: 'Ma couleur préférée est le vert.', 
    ja: '好きな色は緑です。' 
  },
  { 
    en: 'The sky is blue today.', 
    es: 'El cielo está azul hoy.', 
    fr: 'Le ciel est bleu aujourd’hui.', 
    ja: '今日は空が青いです。' 
  },
  { 
    en: 'Her dress is pink.', 
    es: 'Su vestido es rosa.', 
    fr: 'Sa robe est rose.', 
    ja: '彼女のドレスはピンクです。' 
  }
];

const foodAndDrink = [
  { 
    en: 'I would like a coffee, please.', 
    es: 'Quisiera un café, por favor.', 
    fr: 'Je voudrais un café, s’il vous plaît.', 
    ja: 'コーヒーをお願いします。' 
  },
  { 
    en: 'Could I have a glass of water?', 
    es: '¿Podría darme un vaso de agua?', 
    fr: 'Puis-je avoir un verre d’eau ?', 
    ja: 'お水を一杯もらえますか？' 
  },
  { 
    en: 'I would like to see the menu.', 
    es: 'Quisiera ver el menú.', 
    fr: 'Je voudrais voir le menu.', 
    ja: 'メニューを見せてください。' 
  },
  { 
    en: 'What do you recommend?', 
    es: '¿Qué recomienda?', 
    fr: 'Que recommandez-vous ?', 
    ja: 'おすすめは何ですか？' 
  },
  { 
    en: 'Is this dish spicy?', 
    es: '¿Este plato es picante?', 
    fr: 'Ce plat est-il épicé ?', 
    ja: 'この料理は辛いですか？' 
  },
  { 
    en: 'I’m allergic to nuts.', 
    es: 'Soy alérgico a las nueces.', 
    fr: 'Je suis allergique aux noix.', 
    ja: 'ナッツアレルギーがあります。' 
  },
  { 
    en: 'Do you have vegetarian options?', 
    es: '¿Tiene opciones vegetarianas?', 
    fr: 'Avez-vous des plats végétariens ?', 
    ja: 'ベジタリアン料理はありますか？' 
  },
  { 
    en: 'I would like this one, please.', 
    es: 'Quisiera este, por favor.', 
    fr: 'Je voudrais celui-ci, s’il vous plaît.', 
    ja: 'これをお願いします。' 
  },
  { 
    en: 'Can I have the same thing again?', 
    es: '¿Puedo tener lo mismo otra vez?', 
    fr: 'Puis-je avoir la même chose encore ?', 
    ja: '同じものをもう一つください。' 
  },
  { 
    en: 'The food was delicious.', 
    es: 'La comida estaba deliciosa.', 
    fr: 'La nourriture était délicieuse.', 
    ja: '料理はとても美味しかったです。' 
  },
  { 
    en: 'Could we have the check, please?', 
    es: '¿Nos puede traer la cuenta, por favor?', 
    fr: 'L’addition, s’il vous plaît.', 
    ja: 'お会計お願いします。' 
  },
  { 
    en: 'Excuse me, we didn’t order this.', 
    es: 'Disculpe, no pedimos esto.', 
    fr: 'Excusez-moi, nous n’avons pas commandé cela.', 
    ja: 'すみません、これは注文していません。' 
  },
  { 
    en: 'Can I pay by card?', 
    es: '¿Puedo pagar con tarjeta?', 
    fr: 'Puis-je payer par carte ?', 
    ja: 'カードで払えますか？' 
  },
  { 
    en: 'Please make it not too spicy.', 
    es: 'Por favor, que no esté muy picante.', 
    fr: 'Pas trop épicé, s’il vous plaît.', 
    ja: 'あまり辛くしないでください。' 
  },
  { 
    en: 'Do you serve breakfast?', 
    es: '¿Sirven desayuno?', 
    fr: 'Servez-vous le petit déjeuner ?', 
    ja: '朝食はありますか？' 
  },
  { 
    en: 'That smells amazing!', 
    es: '¡Eso huele increíble!', 
    fr: 'Ça sent incroyable !', 
    ja: 'すごくいい匂いですね！' 
  },
  { 
    en: 'Can we sit outside?', 
    es: '¿Podemos sentarnos afuera?', 
    fr: 'Pouvons-nous nous asseoir dehors ?', 
    ja: '外で座ってもいいですか？' 
  },
  { 
    en: 'Can I get it to go?', 
    es: '¿Puedo llevarlo para comer?', 
    fr: 'Puis-je l’emporter ?', 
    ja: '持ち帰りできますか？' 
  },
  { 
    en: 'It was too salty.', 
    es: 'Estaba demasiado salado.', 
    fr: 'C’était trop salé.', 
    ja: '少し塩辛すぎました。' 
  },
  { 
    en: 'Thank you for the meal.', 
    es: 'Gracias por la comida.', 
    fr: 'Merci pour le repas.', 
    ja: 'ごちそうさまでした。' 
  }
];

const timeAndDate = [
  { 
    en: 'What time is it now?', 
    es: '¿Qué hora es ahora?', 
    fr: 'Quelle heure est-il maintenant ?', 
    ja: '今何時ですか？' 
  },
  { 
    en: 'It’s five o’clock.', 
    es: 'Son las cinco en punto.', 
    fr: 'Il est cinq heures.', 
    ja: '5時です。' 
  },
  { 
    en: 'The train leaves at six.', 
    es: 'El tren sale a las seis.', 
    fr: 'Le train part à six heures.', 
    ja: '電車は6時に出ます。' 
  },
  { 
    en: 'I will arrive tomorrow morning.', 
    es: 'Llegaré mañana por la mañana.', 
    fr: 'J’arriverai demain matin.', 
    ja: '明日の朝に到着します。' 
  },
  { 
    en: 'We are leaving this evening.', 
    es: 'Nos vamos esta noche.', 
    fr: 'Nous partons ce soir.', 
    ja: '今夜出発します。' 
  },
  { 
    en: 'I stayed for three days.', 
    es: 'Me quedé tres días.', 
    fr: 'Je suis resté trois jours.', 
    ja: '3日間滞在しました。' 
  },
  { 
    en: 'Let’s meet at ten.', 
    es: 'Nos vemos a las diez.', 
    fr: 'Rendez-vous à dix heures.', 
    ja: '10時に会いましょう。' 
  },
  { 
    en: 'What day is it today?', 
    es: '¿Qué día es hoy?', 
    fr: 'Quel jour sommes-nous ?', 
    ja: '今日は何曜日ですか？' 
  },
  { 
    en: 'My birthday is in July.', 
    es: 'Mi cumpleaños es en julio.', 
    fr: 'Mon anniversaire est en juillet.', 
    ja: '誕生日は7月です。' 
  },
  { 
    en: 'I will stay for one week.', 
    es: 'Me quedaré una semana.', 
    fr: 'Je resterai une semaine.', 
    ja: '1週間滞在します。' 
  },
  { 
    en: 'The museum opens at nine.', 
    es: 'El museo abre a las nueve.', 
    fr: 'Le musée ouvre à neuf heures.', 
    ja: '博物館は9時に開きます。' 
  },
  { 
    en: 'The store closes at eight.', 
    es: 'La tienda cierra a las ocho.', 
    fr: 'Le magasin ferme à huit heures.', 
    ja: 'お店は8時に閉まります。' 
  },
  { 
    en: 'Is it open on Sunday?', 
    es: '¿Está abierto el domingo?', 
    fr: 'Est-ce ouvert le dimanche ?', 
    ja: '日曜日は開いていますか？' 
  },
  { 
    en: 'See you this weekend.', 
    es: 'Nos vemos este fin de semana.', 
    fr: 'À ce week-end.', 
    ja: '今週末に会いましょう。' 
  },
  { 
    en: 'It’s very late.', 
    es: 'Es muy tarde.', 
    fr: 'Il est très tard.', 
    ja: 'もう遅いです。' 
  },
  { 
    en: 'It’s too early.', 
    es: 'Es demasiado temprano.', 
    fr: 'C’est trop tôt.', 
    ja: '早すぎます。' 
  },
  { 
    en: 'I’m running late.', 
    es: 'Voy con retraso.', 
    fr: 'Je suis en retard.', 
    ja: '遅れています。' 
  },
  { 
    en: 'Can we change the time?', 
    es: '¿Podemos cambiar la hora?', 
    fr: 'Pouvons-nous changer l’heure ?', 
    ja: '時間を変えてもいいですか？' 
  },
  { 
    en: 'I have an appointment at two.', 
    es: 'Tengo una cita a las dos.', 
    fr: 'J’ai un rendez-vous à deux heures.', 
    ja: '2時に予約があります。' 
  },
  { 
    en: 'What time does breakfast start?', 
    es: '¿A qué hora empieza el desayuno?', 
    fr: 'Le petit déjeuner commence à quelle heure ?', 
    ja: '朝食は何時からですか？' 
  }
];

const familyAndPeople = [
  { 
    en: 'This is my family.', 
    es: 'Esta es mi familia.', 
    fr: 'C’est ma famille.', 
    ja: 'これは私の家族です。' 
  },
  { 
    en: 'I have two children.', 
    es: 'Tengo dos hijos.', 
    fr: 'J’ai deux enfants.', 
    ja: '子供が二人います。' 
  },
  { 
    en: 'My mother is a teacher.', 
    es: 'Mi madre es profesora.', 
    fr: 'Ma mère est professeure.', 
    ja: '母は教師です。' 
  },
  { 
    en: 'My father works in an office.', 
    es: 'Mi padre trabaja en una oficina.', 
    fr: 'Mon père travaille dans un bureau.', 
    ja: '父は会社で働いています。' 
  },
  { 
    en: 'I have an older brother.', 
    es: 'Tengo un hermano mayor.', 
    fr: 'J’ai un frère aîné.', 
    ja: '兄がいます。' 
  },
  { 
    en: 'I have a younger sister.', 
    es: 'Tengo una hermana menor.', 
    fr: 'J’ai une petite sœur.', 
    ja: '妹がいます。' 
  },
  { 
    en: 'He is my friend.', 
    es: 'Él es mi amigo.', 
    fr: 'C’est mon ami.', 
    ja: '彼は私の友達です。' 
  },
  { 
    en: 'She is my wife.', 
    es: 'Ella es mi esposa.', 
    fr: 'C’est ma femme.', 
    ja: '彼女は私の妻です。' 
  },
  { 
    en: 'This is my husband.', 
    es: 'Este es mi esposo.', 
    fr: 'C’est mon mari.', 
    ja: 'これは私の夫です。' 
  },
  { 
    en: 'We are married.', 
    es: 'Estamos casados.', 
    fr: 'Nous sommes mariés.', 
    ja: '結婚しています。' 
  },
  { 
    en: 'I live with my parents.', 
    es: 'Vivo con mis padres.', 
    fr: 'Je vis avec mes parents.', 
    ja: '両親と一緒に住んでいます。' 
  },
  { 
    en: 'My grandparents live far away.', 
    es: 'Mis abuelos viven lejos.', 
    fr: 'Mes grands-parents habitent loin.', 
    ja: '祖父母は遠くに住んでいます。' 
  },
  { 
    en: 'Do you have any brothers or sisters?', 
    es: '¿Tienes hermanos o hermanas?', 
    fr: 'As-tu des frères ou sœurs ?', 
    ja: '兄弟や姉妹はいますか？' 
  },
  { 
    en: 'I have a big family.', 
    es: 'Tengo una familia grande.', 
    fr: 'J’ai une grande famille.', 
    ja: '大家族です。' 
  },
  { 
    en: 'I have a small family.', 
    es: 'Tengo una familia pequeña.', 
    fr: 'J’ai une petite famille.', 
    ja: '小さな家族です。' 
  },
  { 
    en: 'My best friend lives nearby.', 
    es: 'Mi mejor amigo vive cerca.', 
    fr: 'Mon meilleur ami habite près d’ici.', 
    ja: '親友は近くに住んでいます。' 
  },
  { 
    en: 'We have a baby.', 
    es: 'Tenemos un bebé.', 
    fr: 'Nous avons un bébé.', 
    ja: '赤ちゃんがいます。' 
  },
  { 
    en: 'My aunt is very kind.', 
    es: 'Mi tía es muy amable.', 
    fr: 'Ma tante est très gentille.', 
    ja: '叔母はとても優しいです。' 
  },
  { 
    en: 'My cousin is visiting soon.', 
    es: 'Mi primo viene pronto de visita.', 
    fr: 'Mon cousin vient bientôt en visite.', 
    ja: 'いとこがもうすぐ遊びに来ます。' 
  },
  { 
    en: 'I like spending time with my family.', 
    es: 'Me gusta pasar tiempo con mi familia.', 
    fr: 'J’aime passer du temps avec ma famille.', 
    ja: '家族と過ごす時間が好きです。' 
  }
];

const bodyAndHealth = [
  { 
    en: 'I need a doctor.', 
    es: 'Necesito un médico.', 
    fr: 'J’ai besoin d’un médecin.', 
    ja: '医者が必要です。' 
  },
  { 
    en: 'Is there a hospital nearby?', 
    es: '¿Hay un hospital cerca?', 
    fr: 'Y a-t-il un hôpital près d’ici ?', 
    ja: '近くに病院はありますか？' 
  },
  { 
    en: 'I don’t feel well.', 
    es: 'No me siento bien.', 
    fr: 'Je ne me sens pas bien.', 
    ja: '気分が悪いです。' 
  },
  { 
    en: 'I have a headache.', 
    es: 'Tengo dolor de cabeza.', 
    fr: 'J’ai mal à la tête.', 
    ja: '頭が痛いです。' 
  },
  { 
    en: 'I have a stomach ache.', 
    es: 'Tengo dolor de estómago.', 
    fr: 'J’ai mal au ventre.', 
    ja: 'お腹が痛いです。' 
  },
  { 
    en: 'I have a fever.', 
    es: 'Tengo fiebre.', 
    fr: 'J’ai de la fièvre.', 
    ja: '熱があります。' 
  },
  { 
    en: 'I have a cough.', 
    es: 'Tengo tos.', 
    fr: 'J’ai de la toux.', 
    ja: '咳が出ます。' 
  },
  { 
    en: 'Do you have any medicine for this?', 
    es: '¿Tiene algún medicamento para esto?', 
    fr: 'Avez-vous un médicament pour ça ?', 
    ja: 'これに効く薬はありますか？' 
  },
  { 
    en: 'Can I buy this at a pharmacy?', 
    es: '¿Puedo comprar esto en una farmacia?', 
    fr: 'Puis-je acheter cela en pharmacie ?', 
    ja: '薬局でこれを買えますか？' 
  },
  { 
    en: 'I’m allergic to penicillin.', 
    es: 'Soy alérgico a la penicilina.', 
    fr: 'Je suis allergique à la pénicilline.', 
    ja: 'ペニシリンにアレルギーがあります。' 
  },
  { 
    en: 'Call an ambulance!', 
    es: '¡Llame a una ambulancia!', 
    fr: 'Appelez une ambulance !', 
    ja: '救急車を呼んでください！' 
  },
  { 
    en: 'It hurts here.', 
    es: 'Me duele aquí.', 
    fr: 'J’ai mal ici.', 
    ja: 'ここが痛いです。' 
  },
  { 
    en: 'I cut my hand.', 
    es: 'Me corté la mano.', 
    fr: 'Je me suis coupé la main.', 
    ja: '手を切りました。' 
  },
  { 
    en: 'I need to rest.', 
    es: 'Necesito descansar.', 
    fr: 'J’ai besoin de me reposer.', 
    ja: '休まなければなりません。' 
  },
  { 
    en: 'Can you help me find a pharmacy?', 
    es: '¿Puede ayudarme a encontrar una farmacia?', 
    fr: 'Pouvez-vous m’aider à trouver une pharmacie ?', 
    ja: '薬局を探すのを手伝ってもらえますか？' 
  },
  { 
    en: 'I slipped and fell.', 
    es: 'Me resbalé y caí.', 
    fr: 'J’ai glissé et je suis tombé.', 
    ja: '滑って転びました。' 
  },
  { 
    en: 'It’s an emergency.', 
    es: 'Es una emergencia.', 
    fr: 'C’est une urgence.', 
    ja: '緊急です。' 
  },
  { 
    en: 'Can I get some water, please?', 
    es: '¿Puedo tomar un poco de agua, por favor?', 
    fr: 'Puis-je avoir un peu d’eau, s’il vous plaît ?', 
    ja: 'お水を少しいただけますか？' 
  },
  { 
    en: 'I feel dizzy.', 
    es: 'Me siento mareado.', 
    fr: 'J’ai la tête qui tourne.', 
    ja: 'めまいがします。' 
  },
  { 
    en: 'I feel much better now.', 
    es: 'Me siento mucho mejor ahora.', 
    fr: 'Je me sens beaucoup mieux maintenant.', 
    ja: '今はかなり良くなりました。' 
  }
];

const directionsAndPlaces = [
  {
    en: 'Excuse me, where is the train station?',
    es: 'Disculpe, ¿dónde está la estación de tren?',
    fr: 'Excusez-moi, où est la gare ?',
    ja: 'すみません、駅はどこですか？'
  },
  {
    en: 'Excuse me, where is the bus stop?',
    es: 'Disculpe, ¿dónde está la parada de autobús?',
    fr: 'Excusez-moi, où est l’arrêt de bus ?',
    ja: 'すみません、バス停はどこですか？'
  },
  {
    en: 'How do I get to the airport?',
    es: '¿Cómo llego al aeropuerto?',
    fr: 'Comment puis-je aller à l’aéroport ?',
    ja: '空港へはどう行けばいいですか？'
  },
  {
    en: 'How do I get to this hotel?',
    es: '¿Cómo llego a este hotel?',
    fr: 'Comment puis-je aller à cet hôtel ?',
    ja: 'このホテルへはどう行けばいいですか？'
  },
  {
    en: 'Is it far from here?',
    es: '¿Está lejos de aquí?',
    fr: 'Est-ce loin d’ici ?',
    ja: 'ここから遠いですか？'
  },
  {
    en: 'Is there a bus to the city center?',
    es: '¿Hay un autobús al centro de la ciudad?',
    fr: 'Y a-t-il un bus pour le centre-ville ?',
    ja: '中心部行きのバスはありますか？'
  },
  {
    en: 'Please turn left at the next street.',
    es: 'Por favor, gire a la izquierda en la próxima calle.',
    fr: 'Tournez à gauche à la prochaine rue, s’il vous plaît.',
    ja: '次の通りを左に曲がってください。'
  },
  {
    en: 'Go straight and then turn right.',
    es: 'Vaya recto y luego gire a la derecha.',
    fr: 'Allez tout droit puis tournez à droite.',
    ja: 'まっすぐ行ってから右に曲がってください。'
  },
  {
    en: 'Can you show me on the map?',
    es: '¿Puede mostrármelo en el mapa?',
    fr: 'Pouvez-vous me le montrer sur la carte ?',
    ja: '地図で教えてもらえますか？'
  },
  {
    en: 'I am lost.',
    es: 'Estoy perdido.',   // perdida if speaker is female
    fr: 'Je suis perdu.',   // perdue if speaker is female
    ja: '道に迷いました。'
  },
  {
    en: 'I’m looking for this address.',
    es: 'Estoy buscando esta dirección.',
    fr: 'Je cherche cette adresse.',
    ja: 'この住所を探しています。'
  },
  {
    en: 'Is there a park nearby?',
    es: '¿Hay un parque cerca?',
    fr: 'Y a-t-il un parc près d’ici ?',
    ja: '近くに公園はありますか？'
  },
  {
    en: 'Is there a beach near here?',
    es: '¿Hay una playa cerca de aquí?',
    fr: 'Y a-t-il une plage près d’ici ?',
    ja: 'この近くにビーチはありますか？'
  },
  {
    en: 'Which bus goes to the city center?',
    es: '¿Qué autobús va al centro de la ciudad?',
    fr: 'Quel bus va au centre-ville ?',
    ja: 'どのバスが中心部に行きますか？'
  },
  {
    en: 'Which platform is for this train?',
    es: '¿Qué plataforma es para este tren?',
    fr: 'Quelle plateforme est pour ce train ?',
    ja: 'この電車のプラットフォームはどれですか？'
  }
];

const partiesAndEvents = [
  {
    en: 'Can you come to my party?',
    es: '¿Puedes venir a mi fiesta?',
    fr: 'Peux-tu venir à ma fête ?',
    ja: 'パーティーに来てくれますか？'
  },
  {
    en: 'I’m hosting a party next weekend.',
    es: 'Estoy organizando una fiesta el fin de semana que viene.',
    fr: 'Je vais organiser une fête le week-end prochain.',
    ja: '来週末にパーティーを開きます。'
  },
  {
    en: 'The party is at my house.',
    es: 'La fiesta es en mi casa.',
    fr: 'La fête est chez moi.',
    ja: 'パーティーは私の家であります。'
  },
  {
    en: 'Friends are coming over tonight.',
    es: 'Mis amigos van a venir esta noche.',
    fr: 'Mes amis viennent ce soir.',
    ja: '今夜友達が来ます。'
  },
  {
    en: 'What time does the party start?',
    es: '¿A qué hora empieza la fiesta?',
    fr: 'À quelle heure commence la fête ?',
    ja: 'パーティーは何時に始まりますか？'
  },
  {
    en: 'What time does the party end?',
    es: '¿A qué hora termina la fiesta?',
    fr: 'À quelle heure se termine la fête ?',
    ja: 'パーティーは何時に終わりますか？'
  },
  {
    en: 'Where is the event?',
    es: '¿Dónde es el evento?',
    fr: 'Où a lieu l’événement ?',
    ja: 'イベントはどこで行われますか？'
  },
  {
    en: 'I might be a little late.',
    es: 'Puede que llegue un poco tarde.',
    fr: 'Je risque d’être un peu en retard.',
    ja: '少し遅れるかもしれません。'
  },
  {
    en: 'Can I bring a friend?',
    es: '¿Puedo llevar a un amigo?',
    fr: 'Puis-je amener un ami ?',
    ja: '友達を連れてきてもいいですか？'
  },
  {
    en: 'Do I need to bring anything?',
    es: '¿Necesito llevar algo?',
    fr: 'Est-ce que je dois apporter quelque chose ?',
    ja: '何か持っていった方がいいですか？'
  },
  {
    en: 'Thank you for the invitation.',
    es: 'Gracias por la invitación.',
    fr: 'Merci pour l’invitation.',
    ja: '招待してくれてありがとうございます。'
  },
  {
    en: 'I had a great time at your party.',
    es: 'Lo pasé muy bien en tu fiesta.',
    fr: 'Je me suis beaucoup amusé à ta fête.',
    ja: 'あなたのパーティーはとても楽しかったです。'
  },
  {
    en: 'I’m sorry, I can’t make it.',
    es: 'Lo siento, no puedo ir.',
    fr: 'Je suis désolé, je ne peux pas venir.',
    ja: 'すみませんが、行けません。'
  },
  {
    en: 'Is there a dress code?',
    es: '¿Hay un código de vestimenta?',
    fr: 'Y a-t-il un code vestimentaire ?',
    ja: 'ドレスコードはありますか？'
  },
  {
    en: 'Is it a formal event?',
    es: '¿Es un evento formal?',
    fr: 'Est-ce un événement formel ?',
    ja: 'フォーマルなイベントですか？'
  },
  {
    en: 'Happy birthday!',
    es: '¡Feliz cumpleaños!',
    fr: 'Joyeux anniversaire !',
    ja: 'お誕生日おめでとうございます！'
  },
  {
    en: 'Congratulations on your wedding!',
    es: '¡Felicidades por tu boda!',
    fr: 'Félicitations pour votre mariage !',
    ja: 'ご結婚おめでとうございます！'
  },
  {
    en: 'Let’s celebrate together.',
    es: 'Vamos a celebrar juntos.',
    fr: 'Fêtons cela ensemble.',
    ja: '一緒にお祝いしましょう。'
  },
  {
    en: 'There will be food and drinks.',
    es: 'Habrá comida y bebidas.',
    fr: 'Il y aura à manger et à boire.',
    ja: '食べ物と飲み物があります。'
  },
  {
    en: 'Can you send me the address?',
    es: '¿Puedes enviarme la dirección?',
    fr: 'Peux-tu m’envoyer l’adresse ?',
    ja: '住所を送ってもらえますか？'
  }
];

const shoppingAndMoney = [
  {
    en: 'How much does this cost?',
    es: '¿Cuánto cuesta esto?',
    fr: 'Combien ça coûte ?',
    ja: 'これはいくらですか？'
  },
  {
    en: 'Can you give me a discount?',
    es: '¿Me puede hacer un descuento?',
    fr: 'Pouvez-vous me faire une réduction ?',
    ja: '割引してもらえますか？'
  },
  {
    en: 'Do you have this in a larger size?',
    es: '¿Lo tiene en una talla más grande?',
    fr: 'Vous l’avez dans une taille plus grande ?',
    ja: 'これの大きいサイズはありますか？'
  },
  {
    en: 'Do you have this in a smaller size?',
    es: '¿Lo tiene en una talla más pequeña?',
    fr: 'Vous l’avez dans une taille plus petite ?',
    ja: 'これの小さいサイズはありますか？'
  },
  {
    en: 'Can I try this on?',
    es: '¿Puedo probármelo?',
    fr: 'Je peux l’essayer ?',
    ja: '試着してもいいですか？'
  },
  {
    en: 'Do you accept credit cards?',
    es: '¿Aceptan tarjetas de crédito?',
    fr: 'Acceptez-vous les cartes de crédit ?',
    ja: 'クレジットカードは使えますか？'
  },
  {
    en: 'I will pay in cash.',
    es: 'Pagaré en efectivo.',
    fr: 'Je vais payer en espèces.',
    ja: '現金で払います。'
  },
  {
    en: 'Where is the nearest ATM?',
    es: '¿Dónde está el cajero automático más cercano?',
    fr: 'Où est le distributeur le plus proche ?',
    ja: '一番近いATMはどこですか？'
  },
  {
    en: 'Can I have a receipt, please?',
    es: '¿Me puede dar un recibo, por favor?',
    fr: 'Puis-je avoir un reçu, s’il vous plaît ?',
    ja: 'レシートをもらえますか？'
  },
  {
    en: 'Is this tax-free for tourists?',
    es: '¿Esto es libre de impuestos para turistas?',
    fr: 'Est-ce détaxé pour les touristes ?',
    ja: 'これは免税になりますか？'
  }
];

const airportFlightsBorder = [
  {
    en: 'Where is the check-in counter for this flight?',
    es: '¿Dónde está el mostrador de facturación para este vuelo?',
    fr: 'Où est le comptoir d’enregistrement pour ce vol ?',
    ja: 'この便のチェックインカウンターはどこですか？'
  },
  {
    en: 'Where is the security checkpoint?',
    es: '¿Dónde está el control de seguridad?',
    fr: 'Où se trouve le contrôle de sécurité ?',
    ja: '保安検査場はどこですか？'
  },
  {
    en: 'Where is the boarding gate?',
    es: '¿Dónde está la puerta de embarque?',
    fr: 'Où est la porte d’embarquement ?',
    ja: '搭乗口はどこですか？'
  },
  {
    en: 'Is the flight delayed or on time?',
    es: '¿El vuelo está retrasado o a tiempo?',
    fr: 'Le vol est en retard ou à l’heure ?',
    ja: 'この便は遅れていますか、それとも定刻ですか？'
  },
  {
    en: 'My luggage did not arrive.',
    es: 'Mi equipaje no llegó.',
    fr: 'Mes bagages ne sont pas arrivés.',
    ja: '荷物が届きませんでした。'
  },
  {
    en: 'Where can I report lost luggage?',
    es: '¿Dónde puedo reportar equipaje perdido?',
    fr: 'Où puis-je déclarer un bagage perdu ?',
    ja: '紛失荷物の届け出はどこでできますか？'
  },
  {
    en: 'I am here on vacation.',
    es: 'Estoy aquí de vacaciones.',
    fr: 'Je suis ici en vacances.',
    ja: '休暇で来ました。'
  },
  {
    en: 'I am here for business.',
    es: 'Estoy aquí por trabajo.',
    fr: 'Je suis ici pour le travail.',
    ja: '仕事で来ました。'
  },
  {
    en: 'Do I need to declare anything at customs?',
    es: '¿Necesito declarar algo en la aduana?',
    fr: 'Dois-je déclarer quelque chose à la douane ?',
    ja: '税関で申告するものはありますか？'
  },
  {
    en: 'Where is passport control?',
    es: '¿Dónde está el control de pasaportes?',
    fr: 'Où est le contrôle des passeports ?',
    ja: '入国審査はどこですか？'
  }
];

const hotelsAndAccommodation = [
  {
    en: 'I have a reservation.',
    es: 'Tengo una reserva.',
    fr: 'J’ai une réservation.',
    ja: '予約しています。'
  },
  {
    en: 'I would like to book a room.',
    es: 'Me gustaría reservar una habitación.',
    fr: 'Je voudrais réserver une chambre.',
    ja: '部屋を予約したいです。'
  },
  {
    en: 'What time is check-in and check-out?',
    es: '¿A qué hora son el check-in y el check-out?',
    fr: 'À quelle heure sont l’arrivée et le départ ?',
    ja: 'チェックインとチェックアウトは何時ですか？'
  },
  {
    en: 'Is Wi‑Fi included?',
    es: '¿El Wi‑Fi está incluido?',
    fr: 'Le Wi‑Fi est-il inclus ?',
    ja: 'Wi‑Fiは含まれていますか？'
  },
  {
    en: 'The air conditioning is not working.',
    es: 'El aire acondicionado no funciona.',
    fr: 'La climatisation ne fonctionne pas.',
    ja: 'エアコンが動きません。'
  },
  {
    en: 'There is no hot water.',
    es: 'No hay agua caliente.',
    fr: 'Il n’y a pas d’eau chaude.',
    ja: 'お湯が出ません。'
  },
  {
    en: 'It is very noisy in my room.',
    es: 'Hay mucho ruido en mi habitación.',
    fr: 'Ma chambre est très bruyante.',
    ja: '部屋がとてもうるさいです。'
  },
  {
    en: 'Could I have extra towels, please?',
    es: '¿Podría darme toallas extra, por favor?',
    fr: 'Pourrais-je avoir des serviettes en plus, s’il vous plaît ?',
    ja: 'タオルを追加でもらえますか？'
  },
  {
    en: 'Can I have a late check-out?',
    es: '¿Puedo hacer el check-out más tarde?',
    fr: 'Puis-je faire un départ tardif ?',
    ja: 'レイトチェックアウトはできますか？'
  },
  {
    en: 'Is breakfast included?',
    es: '¿El desayuno está incluido?',
    fr: 'Le petit déjeuner est-il compris ?',
    ja: '朝食は含まれていますか？'
  }
];

const emergenciesAndSafety = [
  {
    en: 'I need help.',
    es: 'Necesito ayuda.',
    fr: 'J’ai besoin d’aide.',
    ja: '助けが必要です。'
  },
  {
    en: 'Call the police, please.',
    es: 'Llame a la policía, por favor.',
    fr: 'Appelez la police, s’il vous plaît.',
    ja: '警察を呼んでください。'
  },
  {
    en: 'Call an ambulance, please.',
    es: 'Llame a una ambulancia, por favor.',
    fr: 'Appelez une ambulance, s’il vous plaît.',
    ja: '救急車を呼んでください。'
  },
  {
    en: 'I am lost.',
    es: 'Estoy perdido.', // perdida if female
    fr: 'Je suis perdu.', // perdue if female
    ja: '道に迷いました。'
  },
  {
    en: 'I have lost my passport.',
    es: 'He perdido mi pasaporte.',
    fr: 'J’ai perdu mon passeport.',
    ja: 'パスポートをなくしました。'
  },
  {
    en: 'My wallet has been stolen.',
    es: 'Me han robado la cartera.',
    fr: 'On m’a volé mon portefeuille.',
    ja: '財布を盗まれました。'
  },
  {
    en: 'Where is the nearest police station?',
    es: '¿Dónde está la comisaría más cercana?',
    fr: 'Où est le commissariat le plus proche ?',
    ja: '一番近い警察署はどこですか？'
  },
  {
    en: 'Is this area safe at night?',
    es: '¿Esta zona es segura por la noche?',
    fr: 'Ce quartier est-il sûr la nuit ?',
    ja: 'このあたりは夜は安全ですか？'
  },
  {
    en: 'I need a translator or interpreter.',
    es: 'Necesito un traductor o intérprete.',
    fr: 'J’ai besoin d’un traducteur ou d’un interprète.',
    ja: '通訳が必要です。'
  },
  {
    en: 'Can you help me contact my embassy?',
    es: '¿Puede ayudarme a contactar con mi embajada?',
    fr: 'Pouvez-vous m’aider à contacter mon ambassade ?',
    ja: '大使館に連絡するのを手伝ってもらえますか？'
  }
];

const smallTalkAndIntroductions = [
  {
    en: 'Where are you from?',
    es: '¿De dónde eres?',
    fr: 'Tu viens d’où ?',
    ja: 'どこの出身ですか？'
  },
  {
    en: 'I am from the United States.',
    es: 'Soy de Estados Unidos.',
    fr: 'Je viens des États-Unis.',
    ja: 'アメリカ出身です。'
  },
  {
    en: 'Is this your first time here?',
    es: '¿Es tu primera vez aquí?',
    fr: 'C’est ta première fois ici ?',
    ja: 'ここは初めてですか？'
  },
  {
    en: 'I am here on vacation.',
    es: 'Estoy aquí de vacaciones.',
    fr: 'Je suis ici en vacances.',
    ja: '休暇で来ています。'
  },
  {
    en: 'I am here for work.',
    es: 'Estoy aquí por trabajo.',
    fr: 'Je suis ici pour le travail.',
    ja: '仕事で来ています。'
  },
  {
    en: 'What do you do?',
    es: '¿A qué te dedicas?',
    fr: 'Tu fais quoi dans la vie ?',
    ja: 'お仕事は何をされていますか？'
  },
  {
    en: 'Do you live nearby?',
    es: '¿Vives cerca de aquí?',
    fr: 'Tu habites près d’ici ?',
    ja: 'この近くに住んでいますか？'
  },
  {
    en: 'How long will you stay here?',
    es: '¿Cuánto tiempo te quedarás aquí?',
    fr: 'Tu restes combien de temps ici ?',
    ja: 'ここにはどのくらい滞在しますか？'
  },
  {
    en: 'Do you come here often?',
    es: '¿Vienes aquí a menudo?',
    fr: 'Tu viens souvent ici ?',
    ja: 'ここにはよく来ますか？'
  },
  {
    en: 'It was nice talking with you.',
    es: 'Fue un gusto hablar contigo.',
    fr: 'C’était sympa de parler avec toi.',
    ja: 'お話しできて楽しかったです。'
  }
];

function createFlashcards(phrases: Array<{ en: string; es: string; fr: string; ja: string }>, category: string): Flashcard[] {
  return phrases.map((phrase, index) => ({
    id: `${category}-${index}`,
    front: phrase.en,
    back: phrase.es,
    category,
    learned: false,
  }));
}

function generateLanguageData(targetLanguage: Language): LanguageData {
  const allPhrases = [
    ...travelPhrases.map(p => ({ ...p, category: 'Travel' })),
    ...commonPhrases.map(p => ({ ...p, category: 'Common Phrases' })),
    ...numbers.map(p => ({ ...p, category: 'Numbers' })),
    ...colors.map(p => ({ ...p, category: 'Colors' })),
    ...foodAndDrink.map(p => ({ ...p, category: 'Food & Drink' })),
    ...timeAndDate.map(p => ({ ...p, category: 'Time & Date' })),
    ...familyAndPeople.map(p => ({ ...p, category: 'Family & People' })),
    ...bodyAndHealth.map(p => ({ ...p, category: 'Body & Health' })),
    ...directionsAndPlaces.map(p => ({ ...p, category: 'Directions & Places' })),
    ...partiesAndEvents.map(p => ({ ...p, category: 'Parties & Events' })),
    ...airportFlightsBorder.map(p => ({ ...p, category: 'Airport & Flights & Border' })),
    ...hotelsAndAccommodation.map(p => ({ ...p, category: 'Hotels & Accommodation' })),
    ...emergenciesAndSafety.map(p => ({ ...p, category: 'Emergencies & Safety' })),
    ...smallTalkAndIntroductions.map(p => ({ ...p, category: 'Small Talk & Introductions' })),
    ...shoppingAndMoney.map(p => ({ ...p, category: 'Shopping & Money' })),
  ];

  const flashcards: Flashcard[] = allPhrases.map((phrase, index) => {
    let backText = '';
    switch (targetLanguage) {
      case 'spanish':
        backText = phrase.es;
        break;
      case 'french':
        backText = phrase.fr;
        break;
      case 'japanese':
        backText = phrase.ja;
        break;
      default:
        backText = phrase.en;
    }
    return {
      id: `${targetLanguage}-${phrase.category}-${index}`,
      front: phrase.en,
      back: backText,
      category: phrase.category,
      learned: false,
    };
  });

  return {
    language: targetLanguage,
    flashcards,
  };
}

export function getLanguageData(language: Language): LanguageData {
  return generateLanguageData(language);
}

export const languageNames: Record<Language, string> = {
  english: 'English',
  spanish: 'Español',
  french: 'Français',
  japanese: '日本語',
};

export const uiTranslations: Record<string, Record<Language, string>> = {
  'selectLanguage': {
    english: 'Select a language to learn',
    spanish: 'Selecciona un idioma para aprender',
    french: 'Sélectionnez une langue à apprendre',
    japanese: '学習する言語を選択してください',
  },
  'startLearning': {
    english: 'Start Learning',
    spanish: 'Comenzar a Aprender',
    french: 'Commencer à Apprendre',
    japanese: '学習を開始',
  },
  'shuffle': {
    english: 'Shuffle',
    spanish: 'Mezclar',
    french: 'Mélanger',
    japanese: 'シャッフル',
  },
  'markAsLearned': {
    english: 'Mark as Learned',
    spanish: 'Marcar como Aprendido',
    french: 'Marquer comme Appris',
    japanese: '学習済みにする',
  },
  'removeLearned': {
    english: 'Remove Learned',
    spanish: 'Quitar Aprendidos',
    french: 'Retirer les Appris',
    japanese: '学習済みを削除',
  },
  'showLearned': {
    english: 'Show Learned',
    spanish: 'Mostrar Aprendidos',
    french: 'Afficher les Appris',
    japanese: '学習済みを表示',
  },
  'cardNumber': {
    english: 'Card',
    spanish: 'Tarjeta',
    french: 'Carte',
    japanese: 'カード',
  },
  'of': {
    english: 'of',
    spanish: 'de',
    french: 'de',
    japanese: '/',
  },
  'backToSelection': {
    english: 'Back to Language Selection',
    spanish: 'Volver a la Selección de Idioma',
    french: 'Retour à la Sélection de Langue',
    japanese: '言語選択に戻る',
  },
  'noCards': {
    english: 'No cards available',
    spanish: 'No hay tarjetas disponibles',
    french: 'Aucune carte disponible',
    japanese: '利用可能なカードがありません',
  },
};

