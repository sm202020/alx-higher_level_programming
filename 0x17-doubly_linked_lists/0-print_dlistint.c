#include <stdio.h>
#include <stddef.h>
#include "lists.h"

/**
 * print_dlistint - print the file in the list
 * dlistint_t - in the dlistint file
 *@h: the node
 * Return: 0
 */
size_t print_dlistint(const dlistint_t *h)
{
	size_t nodeCount = 0;

	while (h != NULL)
	{
		printf("%d\n", h->n);
		h = h->next;
		nodeCount++;
	}
	return (nodeCount);
}
