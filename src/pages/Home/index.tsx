import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import { useTheme } from 'styled-components'

import { CoffeeCard } from '../../components/CoffeeCard'

import { CoffeeList, Heading, Hero, HeroContent, Info } from './styles'
import { useEffect, useState } from 'react';
import { api } from '../../serves/api';
import { Loading } from '../../components/Loading/Loading';

interface Coffee {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
  quantity: number;
};

export function Home() {
  const theme = useTheme();
  const [coffeeList, setCoffeeList] = useState<Coffee[] | null>(null)

  const fetchApi = async () => {
    try {
      const response = await api.get<Coffee[]>('/coffees')
      setCoffeeList(response.data)
    } catch (error) {
      console.log('Deu ruim...', error)
    }
  }

  useEffect(() => {
    fetchApi()
  }, []);



  function incrementQuantity(id: string) {
    if (coffeeList) {
      const coffeeItem = coffeeList.find((coffee) => coffee.id == id)

      if (coffeeItem?.quantity === 5) return

      setCoffeeList(coffeeList?.map(coffee => coffee.id === id
        ? { ...coffee, quantity: coffee.quantity + 1 }
        : coffee
      ))
    }

    return
  }

  function decrementQuantity(id: string) {
    if (coffeeList) {
      const coffeeItem = coffeeList.find((coffee) => coffee.id == id)

      if (coffeeItem?.quantity === 0) return

      setCoffeeList(coffeeList?.map(coffee => coffee.id === id
        ? { ...coffee, quantity: coffee.quantity - 1 }
        : coffee
      ))
    }

    return
  }

  return (
    <div>
      <Hero>
        <HeroContent>
          <div>
            <Heading>
              <h1>Encontre o café perfeito para qualquer hora do dia</h1>

              <span>
                Com o Coffee Delivery você recebe seu café onde estiver, a
                qualquer hora
              </span>
            </Heading>

            <Info>
              <div>
                <ShoppingCart
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['yellow-dark'] }}
                />
                <span>Compra simples e segura</span>
              </div>

              <div>
                <Package
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['base-text'] }}
                />
                <span>Embalagem mantém o café intacto</span>
              </div>

              <div>
                <Timer
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.yellow }}
                />
                <span>Entrega rápida e rastreada</span>
              </div>

              <div>
                <Coffee
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.purple }}
                />
                <span>O café chega fresquinho até você</span>
              </div>
            </Info>
          </div>

          <img src="/images/hero.svg" alt="Café do Coffee Delivery" />
        </HeroContent>

        <img src="/images/hero-bg.svg" id="hero-bg" alt="" />
      </Hero>

      <CoffeeList>
        <h2>Nossos cafés</h2>

        {coffeeList
          ? <div>
            {coffeeList?.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={{
                description: coffee.description,
                id: coffee.id,
                image: coffee.image,
                price: coffee.price,
                tags: coffee.tags,
                title: coffee.title,
                quantity: coffee.quantity,
              }}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
              />
            ))}
          </div>
          : <Loading />}


      </CoffeeList>
    </div>
  )
}
