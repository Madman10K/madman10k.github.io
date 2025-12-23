# Въведение

Алгоритмите от категориите “Разделяй и владей”(“Divide-and-conquer” или D\&C на английски) и динамично програмиране(Dynamic programming или DP на английски) са методи за оптимизиране на решенията за концептуално сложни задачи.

Обикновено, те се прилагат като решения на задачи, които позволяват за разделяне на входните данни или нужните операции на по-малки подзадачи. Целта е постигане на по-оптимално решение на дадена задача, в случаи когато методът на “грубата сила” не би бил подходящ за използване, поради времеви или пространствени ограничения. (Atallah & Blanton), (Cormen et al.)

Целта на тази курсова работа е да представи накратко двете категории алгоритми, да ги сравни с методът на “грубата сила” и да покаже теоретичните и практическите им позитивни и негативни аспекти.

# “Разделяй и владей”

Алгоритмите от категорията “разделяй и владей” се възползват от ситуации, където входните данни, или операциите които трябва да се извършат, могат да бъдат разделени на отделни подоперации, които могат да бъдат изчислени по-бързо.(Atallah & Blanton).

Повечето D\&C алгоритми се синтезират следвайки следните 3 стъпки(Cormen et al.):

1. “Разделяне” \- задачата се разделя на по-малки подзадачи  
2. “Завладяване” \- всяка подстъпка се решава(често рекурсивно)  
3. “Комбиниране” \- готовите резултати се комбинират за да се получи крайният резултат

Примери за такива алгоритми са:

1. Алгоритъм за сортиране чрез сливане  
2. Алгоритъм за бързо сортиране  
3. Алгоритъмът за бързо изчисляване на преобразованието на Фурие

Понеже D\&C алгоритмите често използват рекурсивен подход, в литературата може да се срещне рекурентната функция ***T(n) \= g(n) \+ uT(n/b)***, където функцията ***g(n)*** е константната работа която се извършва при всяко ниво от рекурентната верига, а ***uT(n/b)*** е следващата рекурентна стъпка. Интересното за тази функция, е че тя важи за повечето “разделяй и владей” алгоритми, докато при динамичното програмиране допълнителната евристика и логика прави съставянето на единна формула за всички видове алгоритми на практика невъзможно. Това е доказателство за сравнително простата структура на повечето D\&C алгоритми. (Atallah & Blanton)

## “Намалявай и владей”

В различните видове литература, които разглеждат темата за “разделяй и владей” алгоритмите, може да бъде срещнат и противоречивият термин “намалявай и владей”(decrease-and-conquer от английски). (Levitin)

Алгоритмите от категорията “намалявай и владей” разделят задачата на подзадачи, като постепенно намаляват количеството подзадачи, които трябва да бъдат изчислени. При тази категория алгоритми може да се счита, че стъпката “завладяване” е самото филтриране на подзадачите.(Levitin)

Терминът е противоречив, защото няма консенсус върху това, дали “намалявай и владей” алгоритмите са част от по-широката категория на “разделяй и владей” алгоритмите. Според някои автори, те могат да се считат като частен случай на “разделяй и владей”, според други, те са главно пример за опростяване, и не могат да се припишат към категорията на “разделяй и владей” алгоритмите. (Levitin)

Съставянето на точно определение на този термин е извън обхвата на тази курсова работа и би могло да бъде обект на бъдеща разработка. Затова, ще приемем че “намалявай и владей” алгоритмите са част от категорията на “разделяй и владей” алгоритмите, като в експерименталната част ще бъде разгледан и “намалявай и владей” алгоритъм.

Примери за такива алгоритми са:

1. Алгоритъмът за бинарно търсене(binary search)  
2. Prune & search  
3. Interpolation search  
4. Insertion sort

## Позитивни свойства на “разделяй и владей” алгоритмите

### Лесен паралелизъм

Разделянето на операциите на множество от подоперации помага за по-лесно въвеждането на оптимизации от категорията на паралелното програмиране, като аритметика използвайки SIMD векторни инструкции на процесор или видеокарта, или използвайки многонишково програмиране. (López-Ortiz et al.)

### По-ефикасна употреба на кеш паметта

При повечето процесорни архитектури и модели на оперативната памет обработката на данни е по-бърза, когато данните са с по-малък размер. Разделянето на операциите върху входните данни на по-малки подоперации дава възможност на D\&C алгоритмите да се възползват от кеш паметта на дадената архитектура до значително по-голяма степен с растежа на количеството входни данни. (Frigo et al.)

### Други видове оптимизационна евристика

Разделянето на дадена задача на подзадачи предполага за множество видове оптимизационна евристика. Имайки предвид, че целта на тази курсова работа не е да представи детайлно всички тези методи, просто ще изброим тези, които се срещат най-често:

1. Равно разделяне \- въвеждане на допълнителна функционалност, която да разделя проблема на сравнително равни по големина подпроблеми за да се избегне дълбока рекурсия (Laaksonen 15.5.1)  
2. Сортиране на подзадачите \- позволява за въвеждане на “алчен” алгоритъм, който да започва с най-привлекателните подзадачи  
3. Ограничаване на графата от подзадачи \- при алгоритми в които може да има цикличност е важно да има някакво ограничение върху количеството подзадачи, които могат да бъдат изследвани чрез рекурсия

## Недостатъци

### Ниска производителност с малко количество данни

D\&C алгоритмите често изпълняват повече операции на стъпка в сравнение с методът на “грубата сила”. При сравняване на 2-та метода в реални условия се забелязва, че D\&C алгоритмите са по-оптимални след определено количество стъпки(например, фиг. 2 и 3 от експеримента с алгоритъмът за бинарно търсене). Следователно, при по-малко количество стъпки може да бъде по-удачно да се използва методът на “грубата сила”.

### Ниска производителност при припокриващи се подоперации

D\&C алгоритмите не дискриминират между различните видове подоперации и следователно изчисляват всяка подоперация. Това не би било най-ефикасното поведение, когато операции споделят еднакви подоперации.(Atallah & Blanton)

Този недостатък се решава, чрез синтезирането на алгоритъм използвайки методите на динамичното програмиране.(Atallah & Blanton)

### Употреба на рекурсия

Често, D\&C алгоритмите използват рекурсия като основна част от решението на задачата. Въпреки че употребата на рекурсия води до логически прост и четлив код, в реална среда нейната употреба увеличава пространствените изисквания на програмата, поради нуждата от заделяне на “stack frame” за всяко рекурсивно извикване на алгоритъма, както и може да направи изпълнението на програмата по-бавно или да въведе риск за въвеждане на “stack overflow” бъг при прекалено дълбока рекурентна верига.

## Примерен алгоритъм \- “Намалявай и владей”, търсене в сортирани масиви(бинарно търсене/binary search)

Разглежда се следната задача: като входни данни има масив от числа, в който за данните е гарантирано да са сортирани и число. Да се синтезира алгоритъм, който търси за числото в масива и връща индекса му, или ***\-1*** ако числото не е намерено.

Най-простият алгоритъм би бил стандартният алгоритъм за линейно търсене. Примерен C++ код:
```cpp
int64_t linear_search(const std::vector<int>& array, const int64_t search) noexcept 
{
    for (int64_t i = 0; i < array.size(); i++)
        if (array[i] == search)
            return i;
    return -1;
}
```

Така постигаме времева сложност от ***О(n)***, което е приличен резултат, но знаейки че масива е сортиран, може да се възползваме от по-ефикасен D\&C алгоритъм на име “бинарно търсене”(binary search). 

Алгоритъмът започва като запазва горните и долни индекси на масива. Докато долният индекс е по-малък или равен на по-високият, пресмятаме средният индекс на масива. Проверяваме дали числото в средният индекс е равно на търсената стойност, и ако е го връщаме. В противен случай, проверяваме дали търсената стойност е по-голяма или по-малка от числото в средният индекс и преместваме горният или долният индекс така че да обхващат половината от масива в която би било възможно да присъства търсената стойност. Така с всяка итерация ограничаваме на половина търсеното поле докато не намерим търсената стойност или не достигнем в ситуация където няма повече числа през които да итерираме.

Разделяйки процесът на стъпки:

1. “Разделяне” \- изчисляване на средата на масива  
2. “Завладяване” \- рекурсивно се определя в коя половина от масива би присъствало търсеното число и разделяме тази половина на нейните 2 половини  
3. “Комбиниране” \- Връщаме полученият индекс, или ***\-1***

Така алгоритъмът постига максимална и средна времева сложност от ***O(log(n))*** и ***Θ(log(n))***, и има константна минимална сложност ***Ω(1)*** при 1 елемент. Това се постига, защото рекурентната формула на алгоритъма е ***T \= 1 \+ T(n/2)*** и следователно, ***T(n) \= O(log(n))***. Това означава, че с увеличаването на броя на входните данни, отношението на броя на стъпките за намиране на търсената данна към броя на входните данни клони към **0**. (Atallah & Blanton)

Примерен C++ код:

```cpp
int64_t binary_search(const std::vector<int>& array, const int64_t search) noexcept 
{
    int64_t lower = 0;
    auto higher = static_cast<int64_t>(array.size() - 1);

    while (lower <= higher) 
    {
        const int64_t middle = lower + (higher - lower) / 2;

        if (array[middle] == search)
            return middle;

        if (array[middle] < search)
            lower = middle + 1;
        else
            higher = middle - 1;
    }

    return -1;
}
```

Разбира се, решението за ползване на алгоритъма за бинарно търсене вместо линейният алгоритъм трябва да се вземе на база количеството данни които трябва да бъдат обработени. От графиките се забелязва, че линейният алгоритъм е по-бърз или поне еквивалентно бърз когато входните данни през които преминаваме са малко на брой(***n ≤ 11***). В реални условия, където може да има ограничения от страна на количеството входни данни, а четливостта на програмният код може да е по-голям приоритет от минимални или нулеви оптимизационни печалби, е нужно да се направи сравнение между ефикасността на двата алгоритъма и да се избере най-ефикасният за даденото количество входни данни.


<img src="data:image/png;base64,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">

<img src="data:image/png;base64,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">

<img src="data:image/png;base64,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">

За провеждане на експериментът е синтезирана следната тестова програма: [https://gist.github.com/Madman10K/5fa8baaedfe0f0e29ead9603811ea624](https://gist.github.com/Madman10K/5fa8baaedfe0f0e29ead9603811ea624). 

Компилирането трябва да се извършва само в debug режим, като експеримента прави търсене през масиви с различна големина, от 1 до 500 мил. елемента, като резултатите за време са равни на средноаритметичното време, изчислено след 100 опита.

## Примерен алгоритъм \- сортиране чрез сливане и алгоритъм за бързо сортиране

Алгоритъмът за сортиране чрез сливане(merge sort) и алгоритъмът за бързо сортиране(quick sort) са ефикасни алгоритми за сортиране, които използват D\&C подход за да постигнат оптимална времева сложност ***О(n log(n))***. (Cormen et al.) (Laaksonen 4.1)

Алгоритъмът за сортиране чрез сливане може да се раздели на стъпки по следният начин:

1. “Разделяне” \- алгоритъмът рекурсивно разделя масива на половина  
2. “Завладяване” \- започвайки от листата, алгоритъмът сравнява и сортира предходно сортираните числа за всяко ниво от дървото с подоперации  
3. “Комбиниране” \- функцията връща сортираният резултат

Алгоритъмът за бързо сортиране също следва подобен подход:

1. “Разделяне” \- избира се опорен елемент и масивът се разделя на части спрямо него  
2. “Завладяване” \- рекурсивно се сортират данните  
3. “Комбиниране” \- тази стъпка липсва, защото алгоритъмът автоматично подрежда даните още в предишната стъпка

Алгоритъмът за сортиране чрез сливане се използва главно за случаи, когато се изисква “стабилност” в производителността на алгоритъмът. Неговата времева сложност е ***О(n log(n))***, ***Ω(n log(n))*** и ***Θ(n log(n))***, като тя произлиза от рекурентната формула ***T(n) \= 2T(n/2) \+ Θ(n)***, където функцията ***Θ(n)*** е алгоритъмът за сливане на масивите. Алгоритъмът за бързо сортиране, има времева сложност от ***Θ(n log(n))*** и ***Ω(n log(n))***, но е с максимална сложност от ***О(n2)***, до която се стига при редовни лоши избори на опорен елемент. Следователно, алгоритъмът има 2 рекурентни формули, като при най-добрият или средностатистически случай, рекурентната му формула би била ***T(n) \= 2T(n/2) \+ Θ(n)***, а в най-лошият случай би била ***T(n) \= T(n \- 1\) \+ Θ(n)***, където функцията ***Θ(n)*** е алгоритъмът за сортиране спрямо опорният елемент. Въпреки този недостатък, алгоритъмът за бързо сортиране е един от най-популярните алгоритми за сортиране, поради по-добрата му употреба на кеш паметта и по-ниската му пространствена сложност от ***O(log(n))*** в сравнение с merge sort, чиято сложност е ***O(n)***. (Cormen et al.) (Laaksonen 4.1)

Примерен C++ код за merge sort:

```cpp
void merge_sort(std::vector<int64_t>& a, std::vector<int64_t>& temp, const size_t left, const size_t right) noexcept
{
    if (right - left <= 1)
        return;

    const size_t mid = left + (right - left) / 2;
    merge_sort(a, temp, left, mid);
    merge_sort(a, temp, mid, right);

    size_t i = left;
    size_t j = mid;
    size_t k = left;

    while (i < mid && j < right)
    {
        if (a[i] <= a[j])
            temp[k++] = a[i++];
        else
            temp[k++] = a[j++];
    }

    while (i < mid)
        temp[k++] = a[i++];
    while (j < right)
        temp[k++] = a[j++];

    for (size_t idx = left; idx < right; ++idx)
        a[idx] = temp[idx];
}
```

Примерен C++ код за quick sort:

```cpp
void quick_sort(std::vector<int64_t>& a, const size_t left, const size_t right) noexcept
{
    if (right <= left + 1)
        return;

    size_t i = left;
    size_t j = right - 1;
    const int64_t pivot = a[left + (right - left) / 2];

    while (i <= j)
    {
        while (a[i] < pivot)
            ++i;
        while (a[j] > pivot)
            --j;

        if (i <= j)
        {
            std::swap(a[i], a[j]);
            ++i;
            if (j == 0)
                break;
            --j;
        }
    }

    if (left < j + 1)
        quick_sort(a, left, j + 1);
    if (i < right)
        quick_sort(a, i, right);
}
```

Както се вижда от кода, идеята и на 2-та алгоритъма е да разделят входните данни на 2 части рекурсивно. Главната разлика е че при алгоритъмът за сортиране чрез сливане, масивът се разделя на половина в 2 масива, които се сравняват, сортират и сливат, като за това е нужен допълнителен масив, докато алгоритъмът за бързо сортиране разделя масива само на 2 части спрямо опорен елемент, който е във формата на индекс, като по този начин алгоритъмът може да модифицира входните данни директно в оригиналният масив и следователно не се нуждае от допълнителни структури от данни.

Както може да се забележи от графиките, в реални условия двата алгоритъма са значително по-бързи от методът на “мехурчето” и следвайки горният код са сравнително подобни по производителност. Причината алгоритъмът за бързо сортиране да е по-бърз от алгоритъмът за сортиране чрез сливане главно се дължи на по-добрата употреба на кеш паметта и липсата на нуждата от допълнителна структура за сливането на масивите.  

<img src="data:image/png;base64,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">

<img src="data:image/png;base64,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">

За провеждане на експериментът се използва следната тестова програма: [https://gist.github.com/Madman10K/695e7e57c05c3f619306c56ddb2bbeb0](https://gist.github.com/Madman10K/695e7e57c05c3f619306c56ddb2bbeb0)

Компилирането трябва да се извършва само в “debug” режим. Стойностите на графиките са умножени по ***102***, като алгоритмите правят 10 опита за сортиране на масиви от 1000 до 19000 елемента със стъпка от 1500 елемента.

# Динамично програмиране

Подобно на D\&C алгоритмите, тези от категорията на “динамично програмиране” също разделят “работата” си на отделни части с цел оптимизация. Разликата между D\&C и DP алгоритмите, е че докато D\&C алгоритмите само разделят задачата на отделни части, DP алгоритмите оптимизират за случаи, където няколко задачи биха споделили еднакви подзадачи. Те също се използват и за оптимизационни задачи, където има множество методи за достигане до правилното им решение, докато преминаването през всички от тях не би било оптимално. Често, това се постига чрез методите на мемоизация(top-down method) и табулация(tabular method/bottom-up method). (Cormen et al.)

Примери за такива алгоритми са:

1. Някои оптимизации на алгоритъмът за изчисляване на числата на Фибоначи  
2. Алгоритъма на Дейкстра за най-късият път между 2 точки в граф (Sniedovich)  
3. Алгоритъма на Белман-Форд за най-късият път между 2 точки в граф  
4. Алгоритъмът за решението на “задачата за раницата”(Knapsack problem)

## Метод на мемоизацията

Методът на мемоизацията постепенно изчислява всяка нова операция, като запазва резултата в структура от данни. Когато алгоритъмът срещне стойност, която вече е била изчислена, вместо да пресмята стойността отново, алгоритъмът използва предварително изчислената стойност. По този начин алгоритъм с полиномна времева сложност може да бъде оптимизиран до линейна сложност, за сметка на повишена пространствена сложност.(Atallah & Blanton)

Методът на мемоизацията е полезен за решаване на проблеми, където не се знае какъв е най-оптималният ред за изчисляване на всяка стойност в графата с подоперации.

## Метод на табулацията

Методът на табулацията, или метод “от дъното нагоре”(bottom-up method), е вид подход за решаване на DP задачи, където вместо да се започне от “коренът” на дървото с подзадачи, се започва от “листата”, като всяка предходна стойност се използва за изчисляването на следващата стойност, докато не бъде решена задачата.(Cormen et al.)

Подобно на методът на мемоизацията, при този подход също се използват допълнителни структури от данни, като те служат за запазване на резултатите от решенията на подзадачите. Те често се заделят предварително и за някои алгоритми могат да бъдат и с фиксирана големина. Често, използването на методът на табулацията вместо методът на мемоизацията(когато е възможно), позволява за ограничаване на пространствената сложност на даден алгоритъм от полиномна до линейна, логаритмична, или дори константна.(Cormen et al.)

Главната особеност при методът на табулацията, е че той може да бъде приложен само за случаи, където има само един най-оптимален ред за изчисляване на всяка стойност в наборът от подоперации. Следователно, този подход не може да се приложи за задачи, чието решение не отговаря на тези условия.(Cormen et al.)

## Паралелизъм

Подобно, на алгоритмите от категорията “разделяй и владей”, някои алгоритми от категорията на динамичното програмиране могат да се възползват от допълнителни оптимизации, когато се приложат методите на паралелното програмиране(Maleki et al.)(Galil & Park). 

## Други видове оптимизационна евристика

Подобно на “разделяй и владей”, при динамичното програмиране също има възможност за въвеждане на евристика за оптимизиране на алгоритми. Най-често се срещат:

1. Общи с “разделяй и владей”:  
   1. Равно разделяне  
   2. Сортиране на задачите  
   3. Ограничаване на дълбочината на графата от подзадачи  
2. Пропускане на невъзможни или недостижими състояния  
3. Използване на таблици с константна големина \- в практически ситуации, където пространствените изисквания на алгоритъма са по-високи от горната пространствена граница на въпросната система, за методът на мемоизация и табулация могат да се използват таблици с константна големина, като след запълване на таблицата новите стойности постепенно презаписват старите стойности. (Laaksonen 6.2.3)  
4. Оптимизиране на монотонни свойства на операциите \- алгоритми като оптимизацията на Кнут позволяват за оптимизиране на алгоритми с полиномна времева сложност до линейна или линеаритмична**(*O(n log(n))*)** сложност. (Laaksonen 15.4.3)  
5. Използване на геометрични подходи \- Алгоритми като методът на изпъкнала обвивка и дървото на Ли Чао използват геометричен анализ на данните за постигане на допълнителни оптимизации(Laaksonen 15.4.1)

## Недостатъци

### Допълнителни пространствени изисквания

DP алгоритмите оптимизират за скорост, за сметка на по-високи пространствени изисквания. Това се дължи на нуждата от заделяне на структура от данни за междинните стойности при методите на мемоизацията и табулацията. В реални условия, многократното заделяне на допълнителна памет може значително да забави алгоритъма, както и да създаде проблеми при системи с тесни пространствени ограничения. (Cormen et al.)

### По-сложно въвеждане на паралелизъм

Въпреки че DP алгоритмите могат да се възползват от методите на паралелното програмиране, поради употребата на таблици за запазване на изчислените данни, за някои алгоритми не би било ефикасно да бъдат паралелизирани използвайки повече от една процесорна нишка. Често, това се дължи на нуждата от последователно изпълняване на стъпките в някои алгоритми, както и от нужната синхронизационна логика, която се прилага за всеки достъп до дадената таблица/структура от данни. (Galil & Park)

### Ниска производителност при малко количество входни данни

Подобно на D\&C алгоритмите, DP алгоритмите също не са оптимални за обработване на малки количества данни(Например фиг. 3 от експеримента с числата на Фибоначи)

### Употреба на рекурсия

Подобно на D\&C алгоритмите, DP алгоритмите също често използват рекурсия и наследяват нейните позитиви и недостатъци.

## Примерен алгоритъм \- числата на Фибоначи

Дадено е условието: при дадено число ***n***, изчислете ***n***\-тото число от редицата от числа на Фибоначи.

Най-простият алгоритъм би изглеждал така:

```cpp
uint64_t fibonacci(uint64_t n) {
    if (n < 2) 
        return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

Той има максимална времева сложност от ***O(φn)***, минимална сложност от ***Ω(n)*** при число по-малко от 2 и средна сложност ***Θ(φn)***. В абстрактна компютърна среда, или когато компилаторът разпознава алгоритъма и го оптимизира предварително, може да се твърди че пространствената сложност на алгоритъма е константна ***O(1)***. В реална компютърна среда без допълнителни оптимизации, поради създаването на “call stack” за всяко рекурентно извикване на функцията пространствената сложност се счита за ***O(n)***. В следващите примери се счита, че пространствената сложност на алгоритъма е ***O(n)***.

Една от DP оптимизациите, които може да приложим е да въведем мемоизация. Примерен C++ код:

```cpp
uint64_t fibonacci(int n, std::vector<long long>& memo) 
{
    if (n < 2) 
        return n;

    if (memo[n] != -1) 
        return memo[n];

    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

uint64_t fibonacci(int n) 
{
    std::vector<uint64_t> memo(n + 1, -1);
    return fibonacci(n, memo);
}
```

Този алгоритъм е с рекурентна функция ***T \= T(n \- 1\) \+ Θ(1)***, от което следва че алгоритъма има времева сложност от ***O(n)***, ***Ω(n)*** и ***Θ(n)***, докато пространствената сложност остава ***O(n)***.

Използвайки метода на табулацията, може да се изгради и итеративно решение, което запазва времевата сложност от ***O(n)***, ***Ω(n)*** и ***Θ(n)***, докато ограничава пространствената сложност до константна сложност ***O(1)*** чрез елиминиране на употребата на рекурсия и динамичен масив за мемоизация. Примерен C++ код:

```cpp
uint64_t fibonacci(uint64_t n) 
{
    if (n < 2) 
        return n;

    uint64_t a = 0, b = 1;
    for (int i = 2; i <= n; ++i) 
    {
        uint64_t c = a + b;
        a = b;
        b = c;
    }
    return b;
}
```

Алгоритъмът пресмята сегашното число на Фибоначи като сбор от числата ***a*** и ***b*** с начални стойности ***0*** и ***1*** следователно. След това, ***a*** бива заменено от стойността на ***b***, докато ***b*** бива заменено от стойността на сегашното число на Фибоначи. В този случай, числата ***a*** и ***b*** са предварителните данни, които се използват за въвеждане на метода на табулацията.

Експериментално сравнение на 3-те вида алгоритми: 

<img src="data:image/png;base64,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">

<img src="data:image/png;base64,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">

<img src="data:image/png;base64,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">

За провеждане на експеримента е синтезирана тестова програма:   
[https://gist.github.com/Madman10K/242a8f5d4b1211cc3433d12a856e5bd9](https://gist.github.com/Madman10K/242a8f5d4b1211cc3433d12a856e5bd9). Програмата трябва да се компилира в debug режим. Експеримента изчислява числата на Фибоначи от ***1*** до ***42***, като времевите стойности са изчислени като средноаритметичното време за даденото число след 25 опита.

Изводите от експеримента са, че в реални условия, най-ефикасният алгоритъм за ***n \> 5*** е итеративният алгоритъм, който използва динамично програмиране и метода на табулацията. Мемоизираният алгоритъм е по-бавен, което се дължи на нуждата от заделяне на памет за елементите в таблицата. Най-бавният алгоритъм е наивният, който използва проста рекурентност.

За ***n ≤ 5***, най-бързи са итеративният и наивният алгоритъм, като те са напрактика еквивалентни по производителност, докато мемоизираният алгоритъм е най-бавен за ***n ≤ 9***.

# Заключение

В тази курсова работа разгледахме защо алгоритмите от категориите “разделяй и владей” и динамично програмиране са ефикасни инструменти за синтезиране на оптимални решения за концептуално-сложни задачи. 

Показахме техните положителни качества. Разделянето на задачата на подзадачи е полезна операция, която позволява за множество допълнителни оптимизации. Дори най-простите примери, които разгледахме успяват да ограничат решения с полиномна времева сложност до линейна или логаритмична сложност. Споменахме и допълнителни оптимизации, като въвеждане на паралелизъм, по-ефикасни таблици и други видове евристика. 

Въпреки това, открихме и някои ограничения. Двата метода не са ефикасни при обработка на малко количество данни, често са по-сложни от към четливост на програмният код от методът на грубата сила и често въвеждат допълнителна пространствена сложност, чрез употребата на рекурсия или таблици/списъци. 

Разбира се, тази курсова работа служи само като просто въведение в сферата на тези две алгоритмични парадигми. Някои аспекти, като оптимизиране чрез паралелизъм, или чрез специфични видове евристика нарочно са споменати накратко, защото те се нуждаят от по-задълбочен анализ, който би бил подходящ за изследване в бъдеща разработка.

В крайна сметка, изборът на правилният вид алгоритъм за решение на дадена задача зависи от контекста в който той би бил приложен. Този избор трябва да бъде извършен по прагматичен начин, съобразявайки се както с теоретичните, така и с практическите свойства на въпросният алгоритъм.

# Библиография

1. Atallah, Mikhail J., and Marina Blanton, editors. *Algorithms and Theory of Computation Handbook, Second Edition: General Concepts and Techniques*. Chapman & Hall / CRC Press, 2010\.  
2. Cormen, Thomas H., et al. *Introduction to Algorithms*. MIT Press, 2009\.  
3. Frigo, Matteo, et al. “Cache-Oblivious Algorithms.” *Association for Computing Machinery*, vol. 8, no. 1, 2012, p. 22\. *https://doi.org/10.1145/2071379.2071383*, https://doi.org/10.1145/2071379.2071383.  
4. Galil, Zvi, and Kunsoo Park. *Parallel Dynamic Programming*. 17 March 2012\. *\-*, Department of Computer Science, Columbia University, https://ldhulipala.github.io/readings/paralleldp.pdf.  
5. Laaksonen, Antti. *Guide to Competitive Programming: Learning and Improving Algorithms Through Contests*. Springer International Publishing, 2018\. Accessed 8 December 2025\.  
6. Levitin, Anany. “Do we teach the right algorithm design techniques?” *SIGCSE Bull.*, vol. 31, no. 1, 1999, pp. 179–183. *https://doi.org/10.1145/384266.299747*, https://doi.org/10.1145/384266.299747.  
7. Levitin, Anany. *Introduction to the Design & Analysis of Algorithms*. Pearson, 2012\. Accessed 7 December 2025\.  
8. López-Ortiz, Alejandro, et al. “Toward a Generic Hybrid CPU-GPU Parallelization of Divide-and-Conquer Algorithms.” *2013 IEEE International Symposium on Parallel & Distributed Processing, Workshops and Phd Forum*, vol. \-, no. \-, 2013, pp. 601-610. *https://ieeexplore.ieee.org/document/6650936*, https://ieeexplore.ieee.org/document/6650936.  
9. Maleki, Saeed, et al. *Parallelizing dynamic programming through rank convergence*. 8th August 2014\. *https://doi.org/10.1145/2692916.2555264*, New York, Association for Computing Machinery, https://doi.org/10.1145/2692916.2555264.  
10. Sedgewick, Robert, and Kevin Wayne. *Algorithms*. Addison-Wesley, 2011\. Accessed 16 November 2025\.  
11. Sniedovich, Moshe. “Dijkstra’s algorithm revisited: the dynamic programming connexion.” *Control and Cybernetics*, vol. 35, no. 3, 2006, http://matwbn.icm.edu.pl/ksiazki/cc/cc35/cc3536.pdf.
