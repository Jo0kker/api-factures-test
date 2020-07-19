<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\InvoiceRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=InvoiceRepository::class)
 * @ApiResource(
 *     attributes={
 *          "pagination_enabled" = false,
 *          "order": {"amount":"desc"}
 *     },
 *     subresourceOperations={"api_customers_invoices_get_subresource"={"normalization_context"={"groups"={"invoices_subresouce"}}}},
 *     normalizationContext={"groups"={"invoices_read"}},
 *     collectionOperations={"GET"={"path"="/factures"},"POST"={"path"="/facture"}},
 *     itemOperations={
 *         "GET"={"path"="/facture/{id}"},
 *         "PUT"={"path"="/facture/{id}"},
 *         "DELETE"={"path"="/facture/{id}"},
 *         "increment"={
 *              "method"="post",
 *              "path"="/factures/{id}/increment",
 *              "controller"="App\Controller\InvoiceIncrementationController",
 *              "openapi_context"={
 *                  "summary"="Incremente une facture",
 *                  "description"="Incremente le chrono d'une facture"
 *              }
 *         }
 *     },
 *     denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ApiFilter(OrderFilter::class)
 */
class Invoice
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read","customers_read", "invoices_subresouce"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoices_read","customers_read", "invoices_subresouce"})
     * @Assert\NotBlank(message="Veillez remplir un montant")
     * @Assert\Type(type="numeric", message="Le montant doit etre numerique")
     * @Assert\Positive(message="Doit etre supérieur a zero")
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoices_read","customers_read", "invoices_subresouce"})
     * @Assert\Type(type="\DateTime", message="Le date doit etre au format YYYY-MM-DD")
     */
    private $sendAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoices_read","customers_read", "invoices_subresouce"})
     * @Assert\NotBlank(message="Le statue de la facture est obligatoire")
     * @Assert\Choice(choices={"SENT","PAID","CANCELLED"}, message="Le status doit etre SEND ou PAID ou CANCELLED")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="Le client de la facture doit etre renseigner")
     */
    private $customer;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read","customers_read", "invoices_subresouce"})
     * @Assert\NotBlank(message="il faut un chrono pour la facture")
     * @Assert\Type(type="integer", message="Le chrono doit etre un nombre")
     */
    private $chrono;

    /**
     * @Groups({"invoices_read", "invoices_subresouce"})
     * @return User
     */
    public function getUser() : User
    {
        return $this->customer->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSendAt(): ?\DateTimeInterface
    {
        return $this->sendAt;
    }

    public function setSendAt($sendAt): self
    {
        $this->sendAt = $sendAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono(int $chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}
