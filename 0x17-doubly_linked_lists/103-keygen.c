#include <stdio.h>
#include <string.h>
#include <stdlib.h>

/**
 * main - generate a main function
 * @argc: number of arguments passed
 * @argv: arguments passed to main
 *
 * Return: 0 on success, 1 on error
 */
int main(int argc, char *argv[])
{
	unsigned int randomValue = 0;
	unsigned int squaredSum = 0;
	unsigned int product = 1;
	unsigned int sum = 0;
	size_t usernameLength = strlen(argv[1]);
	unsigned char maxChar = argv[1][0];
	unsigned int i;
	char *charset = "A-CHRDw87lNS0E9B2Tib";
	char key[7] = "      ";

	if (argc != 2)
	{
		printf("Correct usage: %s username\n", argv[0]);
		return (1);
	}
	key[0] = charset[(usernameLength ^ 59) & 63];

	for (i = 0; i < usernameLength; i++)
		sum += argv[1][i];
	key[1] = charset[(sum ^ 79) & 63];

	for (i = 0; i < usernameLength; i++)
		product *= argv[1][i];
	key[2] = charset[(product ^ 85) & 63];

	for (i = 0; i < usernameLength; i++)
		if (argv[1][i] >= maxChar)
			maxChar = argv[1][i];
	srand(maxChar ^ 14);
	key[3] = charset[rand() & 63];

	for (i = 0; i < usernameLength; i++)
		squaredSum += argv[1][i] * argv[1][i];
	key[4] = charset[(squaredSum ^ 239) & 63];
	for (i = 0; (unsigned char)i < argv[1][0]; i++)
		randomValue = rand();
	key[5] = charset[(randomValue ^ 229) & 63];
	printf("%s\n", key);
	return (0);
}
