# Bee

Welcome to Bee. This project is about genomics.

```python
print('hello')

def hello(a):
    bee
```

[hey](models.Individual 'a title :api=bee ')

<!-- see http://plantuml.com/state-diagram -->
```plantuml
scale 350 width
[*] --> Max_Levine

state Max_Levine {
  [*] --> Idle
  Idle --> Configuring : EvConfig
  Configuring --> Idle : EvConfig
}

state Configuring {
  [*] --> NewValueSelection
  NewValueSelection --> NewValuePreview : EvNewValue
  NewValuePreview --> NewValueSelection : EvNewValueRejected
  NewValuePreview --> NewValueSelection : EvNewValueSaved

  state NewValuePreview {
    State1 -> State2
  }

}
@enduml
```
