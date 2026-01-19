
# MebCalc Pro - Mobil APK Oluşturma ve Yükleme Rehberi

Bu projeyi telefonuna APK olarak kurmak için aşağıdaki adımları eksiksiz izle.

## 📦 1. Adım: Kodları GitHub'a Doğru Yükleme
1. GitHub hesabında yeni bir depo (repository) oluştur.
2. Bilgisayarındaki proje klasörüne gir.
3. **ÖNEMLİ:** Klasörün kendisini değil, **içindeki tüm dosyaları ve klasörleri** seç.
4. GitHub'daki depona git, "uploading an existing file" linkine tıkla.
5. Seçtiğin tüm dosyaları (özellikle `.github` ve `components` klasörlerini unutma) buraya sürükle.
6. Sayfanın altındaki "Commit changes" butonuna bas.

## 🤖 2. Adım: APK'nın Hazırlanmasını İzleme
1. Deponun üst menüsündeki **"Actions"** sekmesine tıkla.
2. Sol tarafta **"Android APK Build"** yazısını göreceksin, ona tıkla.
3. En son başlayan işleme (genelde listenin en üstündekidir) tıkla.
4. GitHub şu an senin için sanal bir bilgisayarda Android Studio çalıştırıyor. Bu işlem 5-8 dakika sürebilir.

## 📥 3. Adım: APK Dosyasını İndirme ve Kurma
1. İşlem bittiğinde (yeşil tik `✓` olduğunda), o işlemin detay sayfasının en altına in.
2. **"Artifacts"** bölümünü göreceksin.
3. **"MebCalc-Pro-Debug-APK"** yazısına tıkla. Bir `.zip` dosyası inecek.
4. Zip dosyasını aç, içindeki `app-debug.apk` dosyasını telefonuna gönder (WhatsApp, Drive veya kablo ile).
5. Telefonda dosyaya tıkla ve kur. "Bilinmeyen kaynak" uyarısına "Yine de kur" de.

## 💡 İpucu
Uygulamayı her güncellediğinde (GitHub'a yeni dosya attığında), Actions sekmesinde yeni bir APK dosyası otomatik olarak oluşacaktır. Her seferinde en güncelini oradan alabilirsin.
