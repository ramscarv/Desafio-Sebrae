package com.desafio.pedidos.service;

import com.desafio.pedidos.dto.PedidoDTO;
import com.desafio.pedidos.dto.PedidoItemDTO;
import com.desafio.pedidos.exception.BusinessException;
import com.desafio.pedidos.exception.ResourceNotFoundException;
import com.desafio.pedidos.model.Pedido;
import com.desafio.pedidos.model.PedidoItem;
import com.desafio.pedidos.model.Produto;
import com.desafio.pedidos.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoService {
    
    @Autowired
    private PedidoRepository pedidoRepository;
    
    @Autowired
    private ProdutoService produtoService;
    
    @Transactional
    public PedidoDTO criarPedido(PedidoDTO pedidoDTO) {
        // Validar se o pedido tem itens
        if (pedidoDTO.getItens() == null || pedidoDTO.getItens().isEmpty()) {
            throw new BusinessException("Pedido não pode ser criado sem itens");
        }
        
        Pedido pedido = new Pedido();
        BigDecimal valorTotal = BigDecimal.ZERO;
        
        // Processar cada item
        for (PedidoItemDTO itemDTO : pedidoDTO.getItens()) {
            // Validar quantidade
            if (itemDTO.getQuantidade() <= 0) {
                throw new BusinessException("Quantidade do item deve ser maior que zero");
            }
            
            Produto produto = produtoService.buscarProdutoPorId(itemDTO.getProdutoId());
            
            // Verificar estoque
            if (produto.getQuantidadeEmEstoque() < itemDTO.getQuantidade()) {
                throw new BusinessException("Estoque insuficiente para o produto: " + produto.getNome() +
                        ". Disponível: " + produto.getQuantidadeEmEstoque() + ", Solicitado: " + itemDTO.getQuantidade());
            }
            
            // Criar item do pedido
            PedidoItem item = new PedidoItem();
            item.setPedido(pedido);
            item.setProduto(produto);
            item.setQuantidade(itemDTO.getQuantidade());
            item.setPrecoUnitarioNoMomentoDaCompra(produto.getPreco()); // Preço no momento da compra
            
            BigDecimal subtotal = produto.getPreco().multiply(BigDecimal.valueOf(itemDTO.getQuantidade()));
            item.setSubtotal(subtotal);
            
            pedido.getItens().add(item);
            valorTotal = valorTotal.add(subtotal);
            
            // Atualizar estoque
            produtoService.atualizarEstoque(produto.getId(), itemDTO.getQuantidade());
        }
        
        pedido.setValorTotal(valorTotal);
        Pedido saved = pedidoRepository.save(pedido);
        
        return toDTO(saved);
    }
    
    public List<PedidoDTO> listarPedidos() {
        return pedidoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public PedidoDTO detalharPedido(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado com ID: " + id));
        return toDTO(pedido);
    }
    
    private PedidoDTO toDTO(Pedido pedido) {
        PedidoDTO dto = new PedidoDTO();
        dto.setId(pedido.getId());
        dto.setDataHora(pedido.getDataHora());
        dto.setValorTotal(pedido.getValorTotal());
        
        List<PedidoItemDTO> itensDTO = pedido.getItens().stream().map(item -> {
            PedidoItemDTO itemDTO = new PedidoItemDTO();
            itemDTO.setProdutoId(item.getProduto().getId());
            itemDTO.setProdutoNome(item.getProduto().getNome());
            itemDTO.setQuantidade(item.getQuantidade());
            itemDTO.setPrecoUnitario(item.getPrecoUnitarioNoMomentoDaCompra());
            itemDTO.setSubtotal(item.getSubtotal());
            return itemDTO;
        }).collect(Collectors.toList());
        
        dto.setItens(itensDTO);
        return dto;
    }
}