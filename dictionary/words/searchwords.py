
import Levenshtein


# Open the file for reading
with open(r'E:\ILSHAT\work\python\backend\dictionary\words\english.txt', encoding='utf-8') as file:
    # Read the contents of the file into a list, with each line as a separate element
    try:
        words = [line.strip() for line in file]
    except:
        pass 
    finally:
        file.close()

def binary_search_similar(words, target_letters, max_distance):
    left = 0
    right = len(words) - 1
    matches = []
    
    while left <= right:
        mid = (left + right) // 2
        word = words[mid]
        distance = Levenshtein.distance(word, target_letters)
        if distance <= max_distance:
            matches.append((mid, distance))
        if word < target_letters:
            left = mid + 1
        else:
            right = mid - 1
    
    return matches

def autocomplete(target_letters):
    sorted_words = words
    max_distance = 10

# Get matches and their distances
    matches = binary_search_similar(sorted_words, target_letters, max_distance)

# Sort matches by distance (best match first)
    matches.sort(key=lambda x: x[1])

    if len(matches) > 0:
        sorted_matches=[]
        for match in matches:
            index, distance = match
            sorted_matches.append(sorted_words[index])
        return(sorted_matches)
    else:
        return(target_letters)

