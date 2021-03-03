## Array

### Iteration

```sh
for i in "${!foo[@]}"; do
  printf "%s\t%s\n" "$i" "${foo[$i]}"
done
```

```sh
ITER=0
for I in ${FOO[@]}
do
  echo ${I} ${ITER}
  ITER=$(expr $ITER + 1)
done
```
