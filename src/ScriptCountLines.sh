declare -A linesByExtension

# lista rozszerzeń plików do przeliczenia
fileExtensions=("js" "jsx" "ts" "tsx" "css")

for extension in ${fileExtensions[@]}; do
    # wyszukuje wszystkie pliki o danym rozszerzeniu i liczy linie
    lines=$(find . -name "*.$extension" | xargs wc -l | tail -n 1 | awk '{print $1}')
    linesByExtension[$extension]=$lines
done

for extension in ${!linesByExtension[@]}; do
    echo "Liczba linii dla .$extension: ${linesByExtension[$extension]}"
done