export type Language = 'english' | 'spanish';

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
    es: '¿Podría tomar una foto de nosotros, por favor?'
  },
  { 
    en: 'I have a reservation under the name of...', 
    es: 'Tengo una reserva a nombre de...'
  },
  { 
    en: 'Can you recommend a good local restaurant?', 
    es: '¿Puede recomendarme un buen restaurante local?'
  },
  { 
    en: 'I’m allergic to shellfish.', 
    es: 'Soy alérgico a los mariscos.'
  },
  { 
    en: 'Where can I buy a SIM card?', 
    es: '¿Dónde puedo comprar una tarjeta SIM?'
  },
  { 
    en: 'What time does the last train leave?', 
    es: '¿A qué hora sale el último tren?'
  },
  { 
    en: 'Can I pay with a credit card?', 
    es: '¿Puedo pagar con tarjeta de crédito?'
  },
  { 
    en: 'I lost my passport.', 
    es: 'Perdí mi pasaporte.'
  },
  { 
    en: 'Is there a pharmacy nearby?', 
    es: '¿Hay una farmacia cerca?'
  },
  { 
    en: 'Where can I find a taxi?', 
    es: '¿Dónde puedo encontrar un taxi?'
  }
];

const commonPhrases = [
  { 
    en: 'It’s nice to see you again.', 
    es: 'Me alegra verte de nuevo.'
  },
  { 
    en: 'Have a safe trip!', 
    es: '¡Que tengas un buen viaje!'
  },
  { 
    en: 'I hope you’re doing well.', 
    es: 'Espero que estés bien.'
  },
  { 
    en: 'It’s been a long time.', 
    es: 'Ha pasado mucho tiempo.'
  },
  { 
    en: 'I really appreciate your help.', 
    es: 'Realmente aprecio tu ayuda.'
  },
  { 
    en: 'That sounds great!', 
    es: '¡Suena genial!'
  },
  { 
    en: 'I hope to see you soon.', 
    es: 'Espero verte pronto.'
  },
  { 
    en: 'Take it easy.', 
    es: 'Tómalo con calma.'
  },
  { 
    en: 'Everything will be okay.', 
    es: 'Todo estará bien.'
  },
  { 
    en: 'What do you think?', 
    es: '¿Qué piensas?'
  },
  { 
    en: 'That’s a good idea.', 
    es: 'Es una buena idea.'
  },
  { 
    en: 'I completely agree.', 
    es: 'Estoy totalmente de acuerdo.' 
  },
  { 
    en: 'I’ll be right back.', 
    es: 'Regreso enseguida.'
  },
  { 
    en: 'Please wait a moment.', 
    es: 'Por favor, espera un momento.'
  },
  { 
    en: 'I’m looking forward to it.', 
    es: 'Lo estoy esperando con ilusión.'
  },
  { 
    en: 'It was delicious.', 
    es: 'Estaba delicioso.'
  },
  { 
    en: 'I’m really tired today.', 
    es: 'Estoy muy cansado hoy.'
  },
  { 
    en: 'I had a great time.', 
    es: 'Lo pasé muy bien.'
  },
  { 
    en: 'Call me if you need anything.', 
    es: 'Llámame si necesitas algo.'
  },
  { 
    en: 'See you tomorrow.', 
    es: 'Nos vemos mañana.'
  }
];

const numbers = [
  {
    en: 'There are two of us.',
    es: 'Somos dos.'
  },
  {
    en: 'There are four of us.',
    es: 'Somos cuatro.'
  },
  {
    en: 'I need one ticket, please.',
    es: 'Necesito un boleto, por favor.'
  },
  {
    en: 'I need two tickets, please.',
    es: 'Necesito dos boletos, por favor.'
  },
  {
    en: 'A table for two, please.',
    es: 'Una mesa para dos, por favor.'
  },
  {
    en: 'A table for four, please.',
    es: 'Una mesa para cuatro, por favor.'
  },
  {
    en: 'I will stay for one night.',
    es: 'Me quedaré una noche.'
  },
  {
    en: 'I will stay for three nights.',
    es: 'Me quedaré tres noches.'
  },
  {
    en: 'At what time does it open?',
    es: '¿A qué hora abre?'
  },
  {
    en: 'At what time does it close?',
    es: '¿A qué hora cierra?'
  },
  {
    en: 'What time is the last train?',
    es: '¿A qué hora es el último tren?'
  },
  {
    en: 'How many stops are left?',
    es: '¿Cuántas paradas faltan?'
  },
  {
    en: 'How many people are in your group?',
    es: '¿Cuántas personas hay en su grupo?'
  },
  {
    en: 'I would like one bottle of water.',
    es: 'Quisiera una botella de agua.'
  },
  {
    en: 'I would like two beers, please.',
    es: 'Quisiera dos cervezas, por favor.'
  }
];


const colors = [
  { 
    en: 'I like the blue one.', 
    es: 'Me gusta el azul.'
  },
  { 
    en: 'Do you have this in red?', 
    es: '¿Lo tiene en rojo?'
  },
  { 
    en: 'The green shirt is cheaper.', 
    es: 'La camisa verde es más barata.'
  },
  { 
    en: 'I prefer the black one.', 
    es: 'Prefiero el negro.'
  },
  { 
    en: 'That white car is mine.', 
    es: 'Ese coche blanco es mío.'
  },
  { 
    en: 'The red bag is very nice.', 
    es: 'El bolso rojo es muy bonito.'
  },
  { 
    en: 'Which color do you like?', 
    es: '¿Qué color te gusta?'
  },
  { 
    en: 'My favorite color is green.', 
    es: 'Mi color favorito es el verde.'
  },
  { 
    en: 'The sky is blue today.', 
    es: 'El cielo está azul hoy.'
  },
  { 
    en: 'Her dress is pink.', 
    es: 'Su vestido es rosa.'
  }
];

const foodAndDrink = [
  { 
    en: 'I would like a coffee, please.', 
    es: 'Quisiera un café, por favor.'
  },
  { 
    en: 'Could I have a glass of water?', 
    es: '¿Podría darme un vaso de agua?'
  },
  { 
    en: 'I would like to see the menu.', 
    es: 'Quisiera ver el menú.'
  },
  { 
    en: 'What do you recommend?', 
    es: '¿Qué recomienda?'
  },
  { 
    en: 'Is this dish spicy?', 
    es: '¿Este plato es picante?'
  },
  { 
    en: 'I’m allergic to nuts.', 
    es: 'Soy alérgico a las nueces.'
  },
  { 
    en: 'Do you have vegetarian options?', 
    es: '¿Tiene opciones vegetarianas?'
  },
  { 
    en: 'I would like this one, please.', 
    es: 'Quisiera este, por favor.'
  },
  { 
    en: 'Can I have the same thing again?', 
    es: '¿Puedo tener lo mismo otra vez?'
  },
  { 
    en: 'The food was delicious.', 
    es: 'La comida estaba deliciosa.'
  },
  { 
    en: 'Could we have the check, please?', 
    es: '¿Nos puede traer la cuenta, por favor?'
  },
  { 
    en: 'Excuse me, we didn’t order this.', 
    es: 'Disculpe, no pedimos esto.'
  },
  { 
    en: 'Can I pay by card?', 
    es: '¿Puedo pagar con tarjeta?'
  },
  { 
    en: 'Please make it not too spicy.', 
    es: 'Por favor, que no esté muy picante.'
  },
  { 
    en: 'Do you serve breakfast?', 
    es: '¿Sirven desayuno?'
  },
  { 
    en: 'That smells amazing!', 
    es: '¡Eso huele increíble!'
  },
  { 
    en: 'Can we sit outside?', 
    es: '¿Podemos sentarnos afuera?'
  },
  { 
    en: 'Can I get it to go?', 
    es: '¿Puedo llevarlo para comer?'
  },
  { 
    en: 'It was too salty.', 
    es: 'Estaba demasiado salado.'
  },
  { 
    en: 'Thank you for the meal.', 
    es: 'Gracias por la comida.'
  }
];

const timeAndDate = [
  { 
    en: 'What time is it now?', 
    es: '¿Qué hora es ahora?'
  },
  { 
    en: 'It’s five o’clock.', 
    es: 'Son las cinco en punto.'
  },
  { 
    en: 'The train leaves at six.', 
    es: 'El tren sale a las seis.'
  },
  { 
    en: 'I will arrive tomorrow morning.', 
    es: 'Llegaré mañana por la mañana.'
  },
  { 
    en: 'We are leaving this evening.', 
    es: 'Nos vamos esta noche.'
  },
  { 
    en: 'I stayed for three days.', 
    es: 'Me quedé tres días.'
  },
  { 
    en: 'Let’s meet at ten.', 
    es: 'Nos vemos a las diez.'
  },
  { 
    en: 'What day is it today?', 
    es: '¿Qué día es hoy?'
  },
  { 
    en: 'My birthday is in July.', 
    es: 'Mi cumpleaños es en julio.'
  },
  { 
    en: 'I will stay for one week.', 
    es: 'Me quedaré una semana.'
  },
  { 
    en: 'The museum opens at nine.', 
    es: 'El museo abre a las nueve.'
  },
  { 
    en: 'The store closes at eight.', 
    es: 'La tienda cierra a las ocho.'
  },
  { 
    en: 'Is it open on Sunday?', 
    es: '¿Está abierto el domingo?'
  },
  { 
    en: 'See you this weekend.', 
    es: 'Nos vemos este fin de semana.'
  },
  { 
    en: 'It’s very late.', 
    es: 'Es muy tarde.'
  },
  { 
    en: 'It’s too early.', 
    es: 'Es demasiado temprano.'
  },
  { 
    en: 'I’m running late.', 
    es: 'Voy con retraso.'
  },
  { 
    en: 'Can we change the time?', 
    es: '¿Podemos cambiar la hora?'
  },
  { 
    en: 'I have an appointment at two.', 
    es: 'Tengo una cita a las dos.'
  },
  { 
    en: 'What time does breakfast start?', 
    es: '¿A qué hora empieza el desayuno?'
  }
];

const familyAndPeople = [
  { 
    en: 'This is my family.', 
    es: 'Esta es mi familia.'
  },
  { 
    en: 'I have two children.', 
    es: 'Tengo dos hijos.'
  },
  { 
    en: 'My mother is a teacher.', 
    es: 'Mi madre es profesora.'
  },
  { 
    en: 'My father works in an office.', 
    es: 'Mi padre trabaja en una oficina.'
  },
  { 
    en: 'I have an older brother.', 
    es: 'Tengo un hermano mayor.'
  },
  { 
    en: 'I have a younger sister.', 
    es: 'Tengo una hermana menor.'
  },
  { 
    en: 'He is my friend.', 
    es: 'Él es mi amigo.'
  },
  { 
    en: 'She is my wife.', 
    es: 'Ella es mi esposa.'
  },
  { 
    en: 'This is my husband.', 
    es: 'Este es mi esposo.'
  },
  { 
    en: 'We are married.', 
    es: 'Estamos casados.'
  },
  { 
    en: 'I live with my parents.', 
    es: 'Vivo con mis padres.'
  },
  { 
    en: 'My grandparents live far away.', 
    es: 'Mis abuelos viven lejos.'
  },
  { 
    en: 'Do you have any brothers or sisters?', 
    es: '¿Tienes hermanos o hermanas?'
  },
  { 
    en: 'I have a big family.', 
    es: 'Tengo una familia grande.'
  },
  { 
    en: 'I have a small family.', 
    es: 'Tengo una familia pequeña.'
  },
  { 
    en: 'My best friend lives nearby.', 
    es: 'Mi mejor amigo vive cerca.'
  },
  { 
    en: 'We have a baby.', 
    es: 'Tenemos un bebé.'
  },
  { 
    en: 'My aunt is very kind.', 
    es: 'Mi tía es muy amable.'
  },
  { 
    en: 'My cousin is visiting soon.', 
    es: 'Mi primo viene pronto de visita.'
  },
  { 
    en: 'I like spending time with my family.', 
    es: 'Me gusta pasar tiempo con mi familia.'
  }
];

const bodyAndHealth = [
  { 
    en: 'I need a doctor.', 
    es: 'Necesito un médico.'
  },
  { 
    en: 'Is there a hospital nearby?', 
    es: '¿Hay un hospital cerca?'
  },
  { 
    en: 'I don’t feel well.', 
    es: 'No me siento bien.'
  },
  { 
    en: 'I have a headache.', 
    es: 'Tengo dolor de cabeza.'
  },
  { 
    en: 'I have a stomach ache.', 
    es: 'Tengo dolor de estómago.'
  },
  { 
    en: 'I have a fever.', 
    es: 'Tengo fiebre.'
  },
  { 
    en: 'I have a cough.', 
    es: 'Tengo tos.'
  },
  { 
    en: 'Do you have any medicine for this?', 
    es: '¿Tiene algún medicamento para esto?'
  },
  { 
    en: 'Can I buy this at a pharmacy?', 
    es: '¿Puedo comprar esto en una farmacia?'
  },
  { 
    en: 'I’m allergic to penicillin.', 
    es: 'Soy alérgico a la penicilina.'
  },
  { 
    en: 'Call an ambulance!', 
    es: '¡Llame a una ambulancia!'
  },
  { 
    en: 'It hurts here.', 
    es: 'Me duele aquí.'
  },
  { 
    en: 'I cut my hand.', 
    es: 'Me corté la mano.'
  },
  { 
    en: 'I need to rest.', 
    es: 'Necesito descansar.'
  },
  { 
    en: 'Can you help me find a pharmacy?', 
    es: '¿Puede ayudarme a encontrar una farmacia?'
  },
  { 
    en: 'I slipped and fell.', 
    es: 'Me resbalé y caí.'
  },
  { 
    en: 'It’s an emergency.', 
    es: 'Es una emergencia.'
  },
  { 
    en: 'Can I get some water, please?', 
    es: '¿Puedo tomar un poco de agua, por favor?'
  },
  { 
    en: 'I feel dizzy.', 
    es: 'Me siento mareado.'
  },
  { 
    en: 'I feel much better now.', 
    es: 'Me siento mucho mejor ahora.'
  }
];

const directionsAndPlaces = [
  {
    en: 'Excuse me, where is the train station?',
    es: 'Disculpe, ¿dónde está la estación de tren?'
  },
  {
    en: 'Excuse me, where is the bus stop?',
    es: 'Disculpe, ¿dónde está la parada de autobús?'
  },
  {
    en: 'How do I get to the airport?',
    es: '¿Cómo llego al aeropuerto?'
  },
  {
    en: 'How do I get to this hotel?',
    es: '¿Cómo llego a este hotel?'
  },
  {
    en: 'Is it far from here?',
    es: '¿Está lejos de aquí?'
  },
  {
    en: 'Is there a bus to the city center?',
    es: '¿Hay un autobús al centro de la ciudad?'
  },
  {
    en: 'Please turn left at the next street.',
    es: 'Por favor, gire a la izquierda en la próxima calle.'
  },
  {
    en: 'Go straight and then turn right.',
    es: 'Vaya recto y luego gire a la derecha.'
  },
  {
    en: 'Can you show me on the map?',
    es: '¿Puede mostrármelo en el mapa?'
  },
  {
    en: 'I am lost.',
    es: 'Estoy perdido.'   // perdida if speaker is female
  },
  {
    en: 'I’m looking for this address.',
    es: 'Estoy buscando esta dirección.'
  },
  {
    en: 'Is there a park nearby?',
    es: '¿Hay un parque cerca?'
  },
  {
    en: 'Is there a beach near here?',
    es: '¿Hay una playa cerca de aquí?'
  },
  {
    en: 'Which bus goes to the city center?',
    es: '¿Qué autobús va al centro de la ciudad?'
  },
  {
    en: 'Which platform is for this train?',
    es: '¿Qué plataforma es para este tren?'
  }
];

const partiesAndEvents = [
  {
    en: 'Can you come to my party?',
    es: '¿Puedes venir a mi fiesta?'
  },
  {
    en: 'I’m hosting a party next weekend.',
    es: 'Estoy organizando una fiesta el fin de semana que viene.'
  },
  {
    en: 'The party is at my house.',
    es: 'La fiesta es en mi casa.'
  },
  {
    en: 'Friends are coming over tonight.',
    es: 'Mis amigos van a venir esta noche.'
  },
  {
    en: 'What time does the party start?',
    es: '¿A qué hora empieza la fiesta?'
  },
  {
    en: 'What time does the party end?',
    es: '¿A qué hora termina la fiesta?'
  },
  {
    en: 'Where is the event?',
    es: '¿Dónde es el evento?'
  },
  {
    en: 'I might be a little late.',
    es: 'Puede que llegue un poco tarde.'
  },
  {
    en: 'Can I bring a friend?',
    es: '¿Puedo llevar a un amigo?'
  },
  {
    en: 'Do I need to bring anything?',
    es: '¿Necesito llevar algo?'
  },
  {
    en: 'Thank you for the invitation.',
    es: 'Gracias por la invitación.'
  },
  {
    en: 'I had a great time at your party.',
    es: 'Lo pasé muy bien en tu fiesta.'
  },
  {
    en: 'I’m sorry, I can’t make it.',
    es: 'Lo siento, no puedo ir.'
  },
  {
    en: 'Is there a dress code?',
    es: '¿Hay un código de vestimenta?'
  },
  {
    en: 'Is it a formal event?',
    es: '¿Es un evento formal?'
  },
  {
    en: 'Happy birthday!',
    es: '¡Feliz cumpleaños!'
  },
  {
    en: 'Congratulations on your wedding!',
    es: '¡Felicidades por tu boda!'
  },
  {
    en: 'Let’s celebrate together.',
    es: 'Vamos a celebrar juntos.'
  },
  {
    en: 'There will be food and drinks.',
    es: 'Habrá comida y bebidas.'
  },
  {
    en: 'Can you send me the address?',
    es: '¿Puedes enviarme la dirección?'
  }
];

const shoppingAndMoney = [
  {
    en: 'How much does this cost?',
    es: '¿Cuánto cuesta esto?'
  },
  {
    en: 'Can you give me a discount?',
    es: '¿Me puede hacer un descuento?'
  },
  {
    en: 'Do you have this in a larger size?',
    es: '¿Lo tiene en una talla más grande?'
  },
  {
    en: 'Do you have this in a smaller size?',
    es: '¿Lo tiene en una talla más pequeña?'
  },
  {
    en: 'Can I try this on?',
    es: '¿Puedo probármelo?'
  },
  {
    en: 'Do you accept credit cards?',
    es: '¿Aceptan tarjetas de crédito?'
  },
  {
    en: 'I will pay in cash.',
    es: 'Pagaré en efectivo.'
  },
  {
    en: 'Where is the nearest ATM?',
    es: '¿Dónde está el cajero automático más cercano?'
  },
  {
    en: 'Can I have a receipt, please?',
    es: '¿Me puede dar un recibo, por favor?'
  },
  {
    en: 'Is this tax-free for tourists?',
    es: '¿Esto es libre de impuestos para turistas?'
  }
];

const airportFlightsBorder = [
  {
    en: 'Where is the check-in counter for this flight?',
    es: '¿Dónde está el mostrador de facturación para este vuelo?'
  },
  {
    en: 'Where is the security checkpoint?',
    es: '¿Dónde está el control de seguridad?'
  },
  {
    en: 'Where is the boarding gate?',
    es: '¿Dónde está la puerta de embarque?'
  },
  {
    en: 'Is the flight delayed or on time?',
    es: '¿El vuelo está retrasado o a tiempo?'
  },
  {
    en: 'My luggage did not arrive.',
    es: 'Mi equipaje no llegó.'
  },
  {
    en: 'Where can I report lost luggage?',
    es: '¿Dónde puedo reportar equipaje perdido?'
  },
  {
    en: 'I am here on vacation.',
    es: 'Estoy aquí de vacaciones.'
  },
  {
    en: 'I am here for business.',
    es: 'Estoy aquí por trabajo.'
  },
  {
    en: 'Do I need to declare anything at customs?',
    es: '¿Necesito declarar algo en la aduana?'
  },
  {
    en: 'Where is passport control?',
    es: '¿Dónde está el control de pasaportes?'
  }
];

const hotelsAndAccommodation = [
  {
    en: 'I have a reservation.',
    es: 'Tengo una reserva.'
  },
  {
    en: 'I would like to book a room.',
    es: 'Me gustaría reservar una habitación.'
  },  
  {
    en: 'What time is check-in and check-out?',
    es: '¿A qué hora son el check-in y el check-out?'
  },
  {
    en: 'Is Wi‑Fi included?',
    es: '¿El Wi‑Fi está incluido?'
  },
  {
    en: 'The air conditioning is not working.',
    es: 'El aire acondicionado no funciona.'
  },
  {
    en: 'There is no hot water.',
    es: 'No hay agua caliente.'
  },
  {
    en: 'It is very noisy in my room.',
    es: 'Hay mucho ruido en mi habitación.'
  },
  {
    en: 'Could I have extra towels, please?',
    es: '¿Podría darme toallas extra, por favor?'
  },
  {
    en: 'Can I have a late check-out?',
    es: '¿Puedo hacer el check-out más tarde?'
  },
  {
    en: 'Is breakfast included?',
    es: '¿El desayuno está incluido?'
  }
];

const emergenciesAndSafety = [
  {
    en: 'I need help.',
    es: 'Necesito ayuda.'
  },
  {
    en: 'Call the police, please.',
    es: 'Llame a la policía, por favor.'
  },
  {
    en: 'Call an ambulance, please.',
    es: 'Llame a una ambulancia, por favor.'
  },
  {
    en: 'I am lost.',
    es: 'Estoy perdido.' // perdida if female
  },
  {
    en: 'I have lost my passport.',
    es: 'He perdido mi pasaporte.'
  },
  {
    en: 'My wallet has been stolen.',
    es: 'Me han robado la cartera.'
  },
  {
    en: 'Where is the nearest police station?',
    es: '¿Dónde está la comisaría más cercana?'
  },
  {
    en: 'Is this area safe at night?',
    es: '¿Esta zona es segura por la noche?'
  },
  {
    en: 'I need a translator or interpreter.',
    es: 'Necesito un traductor o intérprete.'
  },
  {
    en: 'Can you help me contact my embassy?',
    es: '¿Puede ayudarme a contactar con mi embajada?'
  }
];

const smallTalkAndIntroductions = [
  {
    en: 'Where are you from?',
    es: '¿De dónde eres?'
  },
  {
    en: 'I am from the United States.',
    es: 'Soy de Estados Unidos.'
  },
  {
    en: 'Is this your first time here?',
    es: '¿Es tu primera vez aquí?'
  },
  {
    en: 'I am here on vacation.',
    es: 'Estoy aquí de vacaciones.'
  },
  {
    en: 'I am here for work.',
    es: 'Estoy aquí por trabajo.'
  },
  {
    en: 'What do you do?',
    es: '¿A qué te dedicas?'
  },
  {
    en: 'Do you live nearby?',
    es: '¿Vives cerca de aquí?'
  },
  {
    en: 'How long will you stay here?',
    es: '¿Cuánto tiempo te quedarás aquí?'
  },
  {
    en: 'Do you come here often?',
    es: '¿Vienes aquí a menudo?'
  },
  {
    en: 'It was nice talking with you.',
    es: 'Fue un gusto hablar contigo.'
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
    // Always store English in front, Spanish in back
    // The component will swap them when learning English
    return {
      id: `${targetLanguage}-${phrase.category}-${index}`,
      front: phrase.en,
      back: phrase.es,
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
};

export const uiTranslations: Record<string, Record<Language, string>> = {
  'selectLanguage': {
    english: 'Select a language to learn',
    spanish: 'Selecciona un idioma para aprender'
  },
  'startLearning': {
    english: 'Start Learning',
    spanish: 'Comenzar a Aprender'
  },
  'shuffle': {
    english: 'Shuffle',
    spanish: 'Mezclar'
  },
  'markAsLearned': {
    english: 'Mark as Learned',
    spanish: 'Marcar como Aprendido'
  },
  'removeLearned': {
    english: 'Remove Learned',
    spanish: 'Quitar Aprendidos'
  },
  'showLearned': {
    english: 'Show Learned',
    spanish: 'Mostrar Aprendidos'
  },
  'cardNumber': {
    english: 'Card',
    spanish: 'Tarjeta'
  },
  'of': {
    english: 'of',
    spanish: 'de'
  },
  'backToSelection': {
    english: 'Back to Language Selection',
    spanish: 'Volver a la Selección de Idioma'
  },
  'noCards': {
    english: 'No cards available',
    spanish: 'No hay tarjetas disponibles'
  },
};

