# useObserveChanges Hook

O `useObserveChanges` é um hook personalizado que observa mudanças em campos específicos e atualiza o estado observado. Este hook é útil para rastrear e gerenciar o estado de vários campos em um componente *React*.

## Instalação

Para usar o `useObserveChanges`, basta importar o hook no seu componente:

## Uso

*Exemplo Básico*

```typescript
import React from 'react';
import useObserveChanges from 'react-use-observe-changes';

const MyComponent = () => {
    const { observedFields, observeIt } = useObserveChanges();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        observeIt(e.target.name, e.target.value);
    };

    return (
        <div>
            <input name="firstName" onChange={handleChange} />
            <input name="lastName" onChange={handleChange} />
            <pre>{JSON.stringify(observedFields, null, 2)}</pre>
        </div>
    );
};

export default MyComponent;
```

## API

`useObserveChanges`

`Hook` que observa mudanças em campos específicos e atualiza o estado observado.

*Retorno*

- `observedFields`: Um objeto contendo o estado dos campos observados.
- `observeIt`: Uma função para observar mudanças em um campo.

*Exemplo*

```typescript
const { observedFields, observeIt } = useObserveChanges();

// Observar mudanças em um campo
observeIt('fieldName', 'on');

// Observar mudanças em um campo com um valor específico
observeIt('fieldName', newValue);

// Acessar o estado dos campos observados
console.log(observedFields);
```

## Observações

- O estado é armazenado em memória e persistirá enquanto o componente que usa este `hook` estiver montado.
- Não há limite explícito para o número de campos que podem ser observados, mas o uso excessivo pode impactar o desempenho.
- Quando o componente desmonta, o estado será limpo.
 
*Exemplo*

`observedFields`

```typescript
// Estado inicial
const [observedFields, setObservedFields] = useState<{ [key: string]: any }>({});

// Após observar mudanças em um campo
observeIt('fieldName', 'newValue');
console.log(observedFields); // { fieldName: 'newValue' }
```

`observeIt`

Função para observar mudanças em um campo.

*Parâmetros*

- `key`: O nome do campo a ser observado.
- `value`: O valor a ser observado. Se for 'on', o valor será alternado.

*Exemplo*

```typescript
// Observar mudanças em um campo com um valor específico de um evento
observeIt('lastName', e.target.value);
```

*Explicação do Código*

```typescript
const observeIt = (key: string, value: any) => {
    if (value === 'on') {
        value = !observedFields[key];
    }
    const newObject = {
        // Spread operator to include all existing observed fields
        ...observedFields,
        // Add or update the field with the new value
        [key]: value
    };
    setObservedFields(newObject);
};
```

1. *Spread Operator* (`...observedFields`):
- *O que ocorre*: O operador spread (...) é usado para copiar todas as propriedades do objeto `observedFields` para o novo objeto `newObject`.
- *Para itens não encontrados*: Se a chave (`key`) não estiver presente em `observedFields`, ela será adicionada ao novo objeto `newObject` com o valor fornecido (`value`).
- *Para itens que já estão lá*: Se a chave (`key`) já estiver presente em `observedFields`, o valor existente será sobrescrito pelo novo valor fornecido (`value`).
1. *Adicionar ou Atualizar o Campo* (`[key]: value`):
- *O que ocorre*: A chave (`key`) é adicionada ou atualizada no novo objeto `newObject` com o valor fornecido (`value`).
- *Para itens não encontrados*: A chave (`key`) será adicionada ao novo objeto `newObject` com o valor fornecido (`value`).
- *Para itens que já estão lá*: A chave (`key`) no novo objeto `newObject` terá seu valor atualizado para o novo valor fornecido (`value`).

*Conclusão*

O hook `useObserveChanges` é uma ferramenta útil para observar e gerenciar mudanças em campos específicos dentro de um componente *React*. Ele fornece uma maneira simples de rastrear o estado de vários campos e reagir a mudanças de forma eficiente.