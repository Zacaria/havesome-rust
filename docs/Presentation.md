---
title: Rust Introduction
revealOptions:
    transition: 'fade'
---

# Rust

<img src="imgs/rust-logo.webp" style="height: 250px">

ClubMed - Zacaria Chtatar - Juin 2023

---
## Pourquoi

Scalabilité du code

- espace
- temps
- fonctionnalité
- sécurité

---

### De gros projets

Github: [Index de recherche de code](https://github.blog/2023-02-06-the-technology-behind-githubs-new-code-search/)

Clouflare: [Proxy framework(vs Nginx)](https://blog.cloudflare.com/introducing-oxy/)

Discord: [Messages lus](https://discord.com/blog/why-discord-is-switching-from-go-to-rust)

Linux: [Kernel](https://linux.developpez.com/actu/337316/Rust-for-Linux-est-officiellement-fusionne-le-support-initial-de-Rust-for-Linux-fournit-l-infrastructure-de-base-et-une-integration-elementaire/)

---

Rapidité

Fiabilité

Productivité

Concurrence

---

<!--

## Contexte

- 8 ans
- release stable toutes les 6 semaines

-->

---
## A noter 

- forte courbe d'apprentissage (au début)

- developpement plus long

- pas idéal pour un mvp

- temps de compilation

note:

le temps de compilation vient du compilateur qui garantis la sécurité de la memory safety

----

peu de missions

surtout des dev C experimentés

note:
peu de missions
- Juste une question de temps, de plus en plus de projets démarrent en Rust

surtout des dev C experimentés
- Plus facile pour eux que pour des devs JS 

---

<!--
# Aujourd'hui

----
# Demain

---

ma Vision

---

# Who

Developpeurs C

Projets critiques

-->

---
## What

Ownership


Compilateur

----

## Data types

```rust
let x: i32 = 42; // `i32` is a signed 32-bit integer

// there's i8, i16, i32, i64, i128
//    also u8, u16, u32, u64, u128 for unsigned
```

----

### Strings

```rust
fn print_length(s: &str) { // &str better for function params
    println!("The length of '{}' is {}.", s, s.len());
}

fn main() {
    // A string literal is a &'static str
    let hello = "Hello, world!"; // hello: &'static str
    print_length(hello);

    // String::from creates a String from a string literal
    let hello_string = String::from(hello); // hello_string: String
    print_length(&hello_string);

    // You can mutate Strings
    let mut hello_mutable = hello_string.clone(); // hello_mutable: String
    hello_mutable.push_str(" And hello again.");
    print_length(&hello_mutable);
}
```

note:

String permet les mutations et l'ownership, parfait pour retourner des strings.
&str, mieux pour les param de fonction : on peut prendre un slice d'une string sans en prendre l'ownership. Permet de passer String et literals.

mut: toutes les assignations immutables par défaut. Même en profondeur dans les objets.

---

### Ownership

- Un seul propriétaire de la donnée

- Plusieurs lecteur ou un seul éditeur

Bout de code ownership

----

#### move
```rust
let s1 = String::from("hello");
let s2 = s1; // s1 is moved into s2.
println!("{}", s1); // Error! s1's value has been moved to s2.
```

----
#### immutable borrow

```rust
let s1 = String::from("hello");
let len = calculate_length(&s1);
s1.push_str(", world"); // Error! s1 has been borrowed as immutable.

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

----
#### mutable borrow

```rust
let mut s1 = String::from("hello");
let r1 = &mut s1;
let r2 = &mut s1; // Error! Cannot borrow `s1` as mutable more than once.

fn change(s: &mut String) {
    s.push_str(", world");
}
```

---

## Tuples

exemple de la représentation

```rust
fn main() {
    let tup = (500, 6.4, "one");

    let (x, y, z) = tup;

    println!("The value of y is: {y}");
}
```

note: 
on peut déstructurer les tuples

---

Les Structs sont déclarées avec `struct`

```rust
struct Number {
    odd: bool,
    value: i32,
}
```
On peut les initialiser avec un literal:
```rust
let x = Number { odd: false, value: 2 };
let y = Number { value: 3, odd: true};
// l'ordre des propriétés n'est pas important
```

----

```rust
fn print_number(n: Number) {
    match n.value {
        1 => println!("One"),
        2 => println!("Two"),
        _ => println!("{}", n.value),
    }
}
```
note:

_ est le default case.
Quand on destructure une valeur il faut aussi vouloir dire qu'on ne s'y intéresse pas

----

```rust
struct Number {
    odd: bool,
    value: i32,
}
```
```rust
impl Number {
    fn is_positive(self) -> bool {
        self.value > 0
    }
}
```

note:

On peut déclarer des méthodes

----

```rust
let minus_two = Number {
    odd: false,
    value: -2,
};
println!("{}", minus_two.is_positive());
```

----


```rust
struct FakeCat {
    alive: bool,
    hungry: bool,
}
```

```rust
enum RealCat {
    Alive { hungry: bool },
    Dead,
}
```

note: 

les enums peuvent contenir de struct
les struct peuvent contenir des enums


---

### Comment représenter "rien" ?

<span>`undefined` ? </span> <!-- .element: class="fragment" data-fragment-index="1" -->

<span>`null` ? </span><!-- .element: class="fragment" data-fragment-index="2" -->

----

## tester null en js

```js
typeof null          // "object" (not "null")
typeof undefined     // "undefined"
null === undefined   // false
null  == undefined   // true
null === null        // true
null  == null        // true
!null                // true
isNaN(1 + null)      // false
isNaN(1 + undefined) // true
```

---

### Option 

```rust
enum Option<T> {
    Some(T),
    None,
}

let possibly_a_number = Some(1);

possibly_a_number.map(|n| n + 1).unwrap_or(0); // = 2

```

None est une valeur

note:

Générics
La valeur est dans une boite, il faut y accéder via .map
map va appliquer la lambda seulement si la valeur est Some
unwrap
unwrap_or ajoute une condition logique

----

```rust
fn find_element_index(arr: &[i32], target: i32) -> Option<usize> {
    for index in 0..arr.len() {
        if arr[index] == target {
            return Some(index);
        }
    }
    None
}

fn main() {
    let numbers = [10, 20, 30, 40, 50];
    let target = 30;

    match find_element_index(&numbers, target) {
        Some(index) => println!("Element {} found at index {}", target, index),
        None => println!("Element {} not found", target),
    }
}

```

---


### Result

```js
function fetchFile (file) {
    try {
        const file = fs.readFileSync('./data.json')
    } catch (err) {
        console.error("something happened")
    }
}

```

note:

Rien ne dit que la fonction peut renvoyer une erreur.
Et que l'appelenat doit la gérer
On aurait carrément pu ne pas mettre de try catch

---

### On n'a pas abordé

Plein de choses dont :
- Traits: interfaces en plus flexibles <!-- .element: class="fragment" data-fragment-index="1" -->

- Macros: metaprogramming <!-- .element: class="fragment" data-fragment-index="2" -->
 
- Mode unsafe: t'inquiète je gère  <!-- .element: class="fragment" data-fragment-index="3" -->

note:

les traits sont plus flexibles
- méthodes par défaut
- composition de traits
- peuvent être passé en paramètre

---

## Getting Started

[rustup.rs](https://rustup.rs/)

[LSP]: rust analyzer

[bacon](https://docs.rs/crate/bacon/latest)

---

## Ouvrir un projet

cargo init
expliquer le cargo.toml et les features

tests
macros
messages d'erreur

---

## Tips

`println!("obj = {:?}", obj);`

`expect("reason")` au lieu de `unwrap()`

`todo!()`

modéliser avant de coder

ChatGPT 😎

---

# Next

HTTP: [reqwest](https://github.com/seanmonstar/reqwest)

Backend: [axum](https://github.com/tokio-rs/axum), [actix](https://github.com/actix/actix-web)

Front: [yew](https://github.com/yewstack/yew)

Fullstack: [Leptos](https://github.com/leptos-rs/leptos)

Client lourd: [tauri](https://github.com/tauri-apps/tauri)

Jeux: [bevy](https://bevyengine.org/)

CLI: [clap](https://github.com/clap-rs/clap)

----

## Super crates

Json parse: [serde](https://github.com/serde-rs/serde)

String parse: [nom](https://github.com/rust-bakery/nom)

Asynchrone: [tokio](https://github.com/tokio-rs/tokio)

---

# Liens

- Rust book
- [Rustlings](https://github.com/rust-lang/rustlings)
- Playground : https://play.rust-lang.org/?version=stable&mode=debug&edition=2021
- fasterthanlime
- Noboilerplate

---

# Merci

---

## Le problème

> Je veux importer du code, du style ou une image dans ma page actuelle <!-- .element: class="fragment" data-fragment-index="1" -->

Cheminement : <!-- .element: class="fragment" data-fragment-index="2" -->
- rien 🤷‍♂️: des scripts qui se partagent le scope global <!-- .element: class="fragment" data-fragment-index="3" -->
- (requirejs, browserify) + (grunt/gulp) : mot clé require <!-- .element: class="fragment" data-fragment-index="4" -->
- webpack : mot clé import <!-- .element: class="fragment" data-fragment-index="5" -->

---

## 
