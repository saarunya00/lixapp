// App.js
import * as React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// =============== BRAND ===============
const BRAND = {
  name: 'Lixeur',
  tagline: 'LUXURY POURED AND PLATED',
  primary: '#083D26', // dark green like your logo background
  accent: '#D4AF37', // gold
  bg: '#f7f5f1',
  text: '#222',
};

// If you later upload your logo somewhere public,
// put that https URL here and change <LixeurHeader /> to <RealLogo />
const LOGO_URI = ''; // e.g. "https://your-site.com/lixeur-logo.png"

// =============== MENUS (from your photos) ===============
const MENUS = {
  cheesecakeShooters: [
    {
      id: 'cs1',
      name: 'Strawberry',
      price: 2.5,
      desc: 'Strawberry cheesecake shooter',
    },
    { id: 'cs2', name: 'Oreo', price: 2.5, desc: 'Oreo crumb + cream' },
    {
      id: 'cs3',
      name: 'Biscoff',
      price: 2.5,
      desc: 'Biscoff biscuit + caramel cream',
    },
    {
      id: 'cs4',
      name: 'Pistachio',
      price: 2.75,
      desc: 'Luxury pistachio cream, nut crumb',
    },
    {
      id: 'cs5',
      name: 'Salted Caramel',
      price: 2.5,
      desc: 'Caramel, biscuit layer',
    },
    {
      id: 'cs6',
      name: 'Chocolate Brownie',
      price: 2.5,
      desc: 'Chocolate base, rich topping',
    },
  ],
  cocktails: [
    {
      id: 'co1',
      name: 'Blue Lagoon',
      price: 4.0,
      desc: 'Vibrant blue, citrus',
    },
    { id: 'co2', name: 'Mojito', price: 4.0, desc: 'Mint, lime, fresh' },
    {
      id: 'co3',
      name: 'Pornstar Martini',
      price: 4.0,
      desc: 'Passionfruit signature',
    },
    {
      id: 'co4',
      name: 'Nelli Bliss',
      price: 4.0,
      desc: 'Tropical, sweet, event favourite',
    },
    {
      id: 'co5',
      name: 'Mango Sunrise',
      price: 4.0,
      desc: 'Mango, orange layers',
    },
    { id: 'co6', name: 'Margarita', price: 4.0, desc: 'Classic, zesty' },
  ],
  mocktails: [
    {
      id: 'mo1',
      name: 'Blue Lagoon',
      price: 2.5,
      desc: 'Non-alcoholic blue lagoon',
    },
    { id: 'mo2', name: 'Mojito', price: 2.5, desc: 'Mint, lime, spritz' },
    { id: 'mo3', name: 'Mango Sunrise', price: 2.5, desc: 'Mango, orange' },
    {
      id: 'mo4',
      name: 'Strawberry Mojito',
      price: 2.5,
      desc: 'Strawberry, mint, lime',
    },
  ],
  packages: [
    {
      id: 'p1',
      name: 'Classic Drinks Only',
      price: 120,
      desc: 'Cocktails / mocktails only, styled.',
    },
    {
      id: 'p2',
      name: 'Drinks + Cheesecake Shooters',
      price: 180,
      desc: 'Mix of drinks + shooters (strawberry, oreo, biscoff, pistachio).',
    },
    {
      id: 'p3',
      name: 'Decked Out Luxe Table',
      price: 230,
      desc: 'Full aesthetic, chiffon runner, flowers, 3 risers, no gaps.',
    },
  ],
};

const Stack = createNativeStackNavigator();

// =============== APP ===============
export default function App() {
  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: BRAND.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Lixeur' }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ title: 'Menus' }}
        />
        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{ title: 'New Booking' }}
        />
        <Stack.Screen
          name="Review"
          component={ReviewScreen}
          options={{ title: 'Review' }}
        />
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
          options={{ title: 'Confirmed' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: BRAND.bg,
  },
};

// =============== SCREENS ===============
function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {LOGO_URI ? <RealLogo /> : <LixeurHeader />}

        <View style={styles.cardRow}>
          <HomeCard
            title="View menus"
            subtitle="Cheesecake shooters, cocktails, mocktails."
            onPress={() => navigation.navigate('Menu')}
          />
          <HomeCard
            title="Create booking"
            subtitle="Event, welcome drinks, party."
            onPress={() => navigation.navigate('Booking')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How Lixeur works</Text>
          <Step
            num="1"
            text="You tell us the date + event + style (e.g. red & white, no gaps, 3 risers)."
          />
          <Step num="2" text="We confirm with you on WhatsApp / Instagram." />
          <Step
            num="3"
            text="Service is done on the day — you pay AFTER the service."
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <Text style={styles.sectionTitle}>Cheesecake Shooters</Text>
        {MENUS.cheesecakeShooters.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}

        <Text style={styles.sectionTitle}>Cocktails</Text>
        {MENUS.cocktails.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}

        <Text style={styles.sectionTitle}>Mocktails</Text>
        {MENUS.mocktails.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}

        <Text style={styles.sectionTitle}>Event Packages</Text>
        {MENUS.packages.map((item) => (
          <MenuItem key={item.id} item={item} highlight />
        ))}

        <Text style={styles.note}>
          Lixeur can match event colours (red, white, purple) and fill the table
          so there are no gaps.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function BookingScreen({ navigation }) {
  const [name, setName] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [eventDate, setEventDate] = React.useState('');
  const [eventType, setEventType] = React.useState('Welcome drinks table');
  const [packageId, setPackageId] = React.useState('p2');
  const [guestCount, setGuestCount] = React.useState('70');
  const [notes, setNotes] = React.useState(
    'Red chiffon runner across table, 3 risers, equal cocktails.'
  );

  const selectedPackage = MENUS.packages.find((p) => p.id === packageId);

  function handleContinue() {
    if (!name || !contact || !eventDate) {
      Alert.alert(
        'Missing details',
        'Please fill name, contact and event date.'
      );
      return;
    }
    navigation.navigate('Review', {
      name,
      contact,
      eventDate,
      eventType,
      packageId,
      guestCount,
      notes,
    });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.sectionTitle}>Booking details</Text>

        <Field label="Your full name" value={name} onChangeText={setName} />
        <Field
          label="Contact (WhatsApp / Instagram / Mobile)"
          value={contact}
          onChangeText={setContact}
          placeholder="@lixeurdrinks or +44..."
        />
        <Field
          label="Event date (dd/mm/yyyy)"
          value={eventDate}
          onChangeText={setEventDate}
          placeholder="03/11/2025"
        />

        <Text style={styles.label}>Event type</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 12 }}>
          {[
            'Welcome drinks table',
            'Birthday',
            'Bridal / Hen',
            'Corporate / Office',
          ].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.chip, eventType === type && styles.chipActive]}
              onPress={() => setEventType(type)}>
              <Text
                style={[
                  styles.chipText,
                  eventType === type && styles.chipTextActive,
                ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Lixeur package (pay AFTER service)</Text>
        {MENUS.packages.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[
              styles.packageOption,
              packageId === p.id && styles.packageOptionActive,
            ]}
            onPress={() => setPackageId(p.id)}>
            <View style={{ flex: 1 }}>
              <Text style={styles.packageTitle}>{p.name}</Text>
              <Text style={styles.packageDesc}>{p.desc}</Text>
            </View>
            <Text style={styles.packagePrice}>£{p.price}</Text>
          </TouchableOpacity>
        ))}

        <Field
          label="How many guests / drinks?"
          value={guestCount}
          onChangeText={setGuestCount}
          keyboardType="numeric"
          placeholder="e.g. 70 drinks"
        />

        <Field
          label="Styling notes"
          value={notes}
          onChangeText={setNotes}
          multiline
          placeholder="e.g. red & white flowers, no gaps, welcome sign"
        />

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Payment info</Text>
          <Text style={styles.summaryText}>
            ✅ Payment is AFTER the service.
          </Text>
          <Text style={styles.summaryText}>
            ✅ We will confirm your booking on your contact.
          </Text>
          <Text style={styles.summaryText}>
            ✅ Travel/delivery may be added depending on location.
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={handleContinue}>
          <Text style={styles.primaryBtnText}>
            Review booking{' '}
            {selectedPackage ? `(£${selectedPackage.price})` : ''}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function ReviewScreen({ route, navigation }) {
  const { name, contact, eventDate, eventType, packageId, guestCount, notes } =
    route.params;
  const selectedPackage = MENUS.packages.find((p) => p.id === packageId);

  function handleConfirm() {
    navigation.replace('Confirmation', {
      name,
      contact,
      eventDate,
      eventType,
      package: selectedPackage,
      guestCount,
      notes,
      ref: createRefCode(name, eventDate),
    });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.sectionTitle}>Review your booking</Text>
        <InfoRow label="Name" value={name} />
        <InfoRow label="Contact" value={contact} />
        <InfoRow label="Event date" value={eventDate} />
        <InfoRow label="Event type" value={eventType} />
        <InfoRow label="Package" value={selectedPackage?.name} />
        <InfoRow label="Guests / Drinks" value={guestCount} />
        <InfoRow label="Styling notes" value={notes} />

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Payment</Text>
          <Text style={styles.summaryText}>• Pay AFTER service ✅</Text>
          <Text style={styles.summaryText}>
            • Estimated: £{selectedPackage?.price ?? '—'} (+ travel if needed)
          </Text>
          <Text style={styles.summaryText}>
            • Lixeur will DM/WhatsApp to confirm.
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={handleConfirm}>
          <Text style={styles.primaryBtnText}>Confirm booking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryBtnText}>Edit details</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function ConfirmationScreen({ route, navigation }) {
  const {
    name,
    eventDate,
    eventType,
    contact,
    package: pkg,
    guestCount,
    notes,
    ref,
  } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.confirmBox}>
          <Text style={styles.confirmTitle}>Booking received 🎉</Text>
          <Text style={styles.confirmRef}>Ref: {ref}</Text>
          <Text style={styles.confirmText}>
            {name ? `Hi ${name.split(' ')[0]},` : 'Hi,'} your booking with
            Lixeur is in.
          </Text>
          <Text style={styles.confirmText}>
            We will contact you on {contact} to confirm the setup.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Booking summary</Text>
        <InfoRow label="Event date" value={eventDate} />
        <InfoRow label="Event type" value={eventType} />
        <InfoRow label="Package" value={pkg?.name} />
        <InfoRow label="Guests / Drinks" value={guestCount} />
        <InfoRow label="Styling notes" value={notes} />
        <InfoRow
          label="Estimated amount"
          value={
            pkg?.price ? `£${pkg.price} (pay after service)` : 'To be confirmed'
          }
        />

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Next steps</Text>
          <Text style={styles.summaryText}>
            1. Lixeur messages you to confirm time & location.
          </Text>
          <Text style={styles.summaryText}>
            2. You approve the colours (red/white/purple).
          </Text>
          <Text style={styles.summaryText}>3. Service → then you pay.</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.popToTop()}>
          <Text style={styles.primaryBtnText}>Back to home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// =============== HELPERS / COMPONENTS ===============
function LixeurHeader() {
  return (
    <View style={styles.headerBox}>
      <View style={styles.headerCup} />
      <Text style={styles.headerBrand}>LIXEUR</Text>
      <Text style={styles.headerTag}>{BRAND.tagline}</Text>
    </View>
  );
}

function RealLogo() {
  return (
    <View style={styles.logoBox}>
      <Image
        source={{ uri: LOGO_URI }}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

function HomeCard({ title, subtitle, onPress }) {
  return (
    <TouchableOpacity style={styles.homeCard} onPress={onPress}>
      <Text style={styles.homeCardTitle}>{title}</Text>
      <Text style={styles.homeCardSubtitle}>{subtitle}</Text>
      <Text style={styles.homeCardLink}>Open →</Text>
    </TouchableOpacity>
  );
}

function Step({ num, text }) {
  return (
    <View style={styles.step}>
      <Text style={styles.stepNum}>{num}</Text>
      <Text style={styles.stepText}>{text}</Text>
    </View>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
        keyboardType={keyboardType}
        multiline={multiline}
        style={[
          styles.input,
          multiline && { height: 90, textAlignVertical: 'top' },
        ]}
      />
    </View>
  );
}

function MenuItem({ item, highlight = false }) {
  return (
    <View style={[styles.menuItem, highlight && styles.menuItemHighlight]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.menuTitle}>{item.name}</Text>
        <Text style={styles.menuDesc}>{item.desc}</Text>
      </View>
      <Text style={styles.menuPrice}>£{item.price.toFixed(2)}</Text>
    </View>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function createRefCode(name, date) {
  const initials = name
    .split(' ')
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  const d = date.replace(/\D/g, '').slice(0, 8);
  return `LX-${initials || 'XX'}-${d || '000000'}`;
}

// =============== STYLES ===============
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BRAND.bg,
  },
  container: {
    padding: 16,
  },
  headerBox: {
    backgroundColor: BRAND.primary,
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  headerCup: {
    width: 50,
    height: 36,
    borderBottomWidth: 3,
    borderBottomColor: BRAND.accent,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
    borderRightWidth: 3,
    borderRightColor: 'transparent',
    marginBottom: 8,
  },
  headerBrand: {
    fontSize: 26,
    letterSpacing: 3,
    fontWeight: '700',
    color: BRAND.accent,
  },
  headerTag: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    letterSpacing: 1,
  },
  logoBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 200,
    height: 80,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  homeCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    borderLeftWidth: 5,
    borderLeftColor: BRAND.accent,
  },
  homeCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND.primary,
  },
  homeCardSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  homeCardLink: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: BRAND.accent,
  },
  section: {
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: BRAND.primary,
    marginBottom: 10,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  stepNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: BRAND.accent,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontWeight: '700',
    marginRight: 8,
  },
  stepText: {
    flex: 1,
    fontSize: 13,
    color: BRAND.text,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  menuItemHighlight: {
    borderWidth: 1,
    borderColor: BRAND.accent,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND.primary,
  },
  menuDesc: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  menuPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: BRAND.accent,
    marginLeft: 10,
  },
  note: {
    fontSize: 12,
    color: '#555',
    marginTop: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: BRAND.primary,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(8,61,38,0.15)',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: BRAND.primary,
  },
  chipText: {
    color: BRAND.primary,
    fontSize: 12,
  },
  chipTextActive: {
    color: '#fff',
  },
  packageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginTop: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  packageOptionActive: {
    borderColor: BRAND.accent,
    backgroundColor: '#fff9eb',
  },
  packageTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND.primary,
  },
  packageDesc: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  packagePrice: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND.accent,
    marginLeft: 10,
  },
  summaryBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginTop: 16,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
    color: BRAND.primary,
  },
  summaryText: {
    fontSize: 12,
    color: '#555',
  },
  primaryBtn: {
    backgroundColor: BRAND.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: BRAND.primary,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryBtnText: {
    color: BRAND.primary,
    fontWeight: '600',
  },
  infoRow: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 12,
    color: '#788',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND.primary,
    marginTop: 2,
  },
  confirmBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: BRAND.primary,
  },
  confirmRef: {
    fontSize: 13,
    fontWeight: '600',
    color: BRAND.accent,
    marginTop: 4,
    marginBottom: 4,
  },
  confirmText: {
    fontSize: 13,
    color: '#555',
    marginTop: 3,
  },
});
